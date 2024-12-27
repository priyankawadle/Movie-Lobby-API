import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import 'mocha';
import dotenv from 'dotenv';

// Load test env
dotenv.config();

// Import your app and model
import app from '../src/app';
import Movie from '../src/models/movie.model';

describe('Movie Routes Tests (with Test DB)', () => {
  before(async () => {
    if (!process.env.MONGODB_URI_TEST) {
      throw new Error('MONGODB_URI_TEST not defined for test environment');
    }
    if (process.env.NODE_ENV === "test") {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    }
  });

  beforeEach(async () => {
    // Clear test DB
    await Movie.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('GET /movies', () => {
    it('should return 200 and an empty array initially', async () => {
      const res = await request(app).get('/movies');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').lengthOf(0);
    });

    it('should return all inserted movies', async () => {
      await Movie.create([
        { title: 'Movie1', genre: 'Genre1', rating: 5, streamingLink: 'http://link1' },
        { title: 'Movie2', genre: 'Genre2', rating: 8, streamingLink: 'http://link2' },
      ]);
      const res = await request(app).get('/movies');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /movies', () => {
    it('should return 403 if not admin', async () => {
      const newMovie = { title: 'Avatar', genre: 'Adventure', rating: 8, streamingLink: 'http://avatar' };
      const res = await request(app).post('/movies').send(newMovie); // no x-role header
      expect(res.status).to.equal(403);
      expect(res.body).to.have.property('error', 'Admin access only');
    });

    it('should create a new movie if admin', async () => {
      const newMovie = { title: 'Avatar', genre: 'Adventure', rating: 8, streamingLink: 'http://avatar' };
      const res = await request(app)
        .post('/movies')
        .set('x-role', 'admin') // simulate admin
        .send(newMovie);

      expect(res.status).to.equal(201);
      expect(res.body).to.include({ title: 'Avatar', genre: 'Adventure', rating: 8 });

      const dbMovies = await Movie.find({});
      expect(dbMovies).to.have.length(1);
    });
  });

  describe('PUT /movies/:id', () => {
    it('should update a movie rating (admin only)', async () => {
      const created = await Movie.create({
        title: 'Inception',
        genre: 'Sci-Fi',
        rating: 9,
        streamingLink: 'http://inception'
      });

      const res = await request(app)
        .put(`/movies/${created._id}`)
        .set('x-role', 'admin')
        .send({ rating: 10 });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('rating', 10);

      const updated = await Movie.findById(created._id);
      expect(updated?.rating).to.equal(10);
    });
  });

  describe('DELETE /movies/:id', () => {
    it('should delete a movie (admin only)', async () => {
      const created = await Movie.create({
        title: 'TestDel',
        genre: 'TestG',
        rating: 1,
        streamingLink: 'http://testdel'
      });

      const res = await request(app)
        .delete(`/movies/${created._id}`)
        .set('x-role', 'admin');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ message: 'Movie deleted successfully' });

      const found = await Movie.findById(created._id);
      expect(found).to.be.null;
    });
  });
});
