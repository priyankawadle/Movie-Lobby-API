import { expect } from 'chai';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import 'mocha';
import dotenv from 'dotenv';

// Load test env
dotenv.config();

// Import the model, controller
import Movie from '../src/models/movie.model';
import {
  listMovies,
  search,
  addMovie,
  editMovie,
  removeMovie
} from '../src/controllers/movie.controller';

// Helper to mock res.status(...).json(...)
function createMockResponse() {
  let statusCode: number | undefined;
  let jsonPayload: any;

  const res = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(data: any) {
      jsonPayload = data;
      return this;
    },
  };

  return {
    res: res as unknown as Response,
    getStatus: () => statusCode,
    getPayload: () => jsonPayload,
  };
}

describe('Movie Controller Tests (with Test DB)', () => {
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
    // Close DB connection when done
    await mongoose.connection.close();
  });

  it('listMovies should return 200 and an empty array initially', async () => {
    const req = {} as Request;
    const mock = createMockResponse();

    await listMovies(req, mock.res);

    expect(mock.getStatus()).to.equal(200);
    expect(mock.getPayload()).to.be.an('array').lengthOf(0);
  });

  it('addMovie should create a new movie and return 201', async () => {
    const req = {
      body: {
        title: 'Inception',
        genre: 'Sci-Fi',
        rating: 9,
        streamingLink: 'http://inception',
      },
    } as unknown as Request;

    const mock = createMockResponse();

    await addMovie(req, mock.res);
    expect(mock.getStatus()).to.equal(201);
    expect(mock.getPayload()).to.have.property('_id');
    expect(mock.getPayload()).to.include({ title: 'Inception', genre: 'Sci-Fi', rating: 9 });

    // Verify in DB
    const dbMovies = await Movie.find({});
    expect(dbMovies).to.have.length(1);
  });

  it('search should return 400 if no query provided', async () => {
    const req = { query: {} } as unknown as Request;
    const mock = createMockResponse();

    await search(req, mock.res);

    expect(mock.getStatus()).to.equal(400);
    expect(mock.getPayload()).to.have.property('error', 'Query parameter "q" is required');
  });

  it('editMovie should return 404 if movie not found', async () => {
    const req = {
      params: { id: '615f3b72fc13ae1c2f000001' }, // some random ID
      body: { rating: 10 },
    } as unknown as Request;
    const mock = createMockResponse();

    await editMovie(req, mock.res);

    expect(mock.getStatus()).to.equal(404);
    expect(mock.getPayload()).to.have.property('error', 'Movie not found');
  });

  it('removeMovie should return 404 if movie not found', async () => {
    const req = {
      params: { id: '615f3b72fc13ae1c2f000002' },
    } as unknown as Request;
    const mock = createMockResponse();

    await removeMovie(req, mock.res);

    expect(mock.getStatus()).to.equal(404);
    expect(mock.getPayload()).to.have.property('error', 'Movie not found');
  });
});
