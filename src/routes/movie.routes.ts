import { Router } from 'express';
import {
  listMovies,
  search,
  addMovie,
  editMovie,
  removeMovie
} from '../controllers/movie.controller';
import { adminOnly } from '../middlewares/auth.middleware';

const router = Router();

router.get('/movies', listMovies);             // GET /movies
router.get('/search', search);                 // GET /search?q={query}
router.post('/movies', adminOnly, addMovie);   // POST /movies
router.put('/movies/:id', adminOnly, editMovie);  // PUT /movies/:id
router.delete('/movies/:id', adminOnly, removeMovie); // DELETE /movies/:id

export default router;
