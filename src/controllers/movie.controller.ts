import { Request, Response } from 'express';
import {
  getAllMovies,
  searchMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from '../services/movie.service';
import { getCache, setCache } from '../cache';

export async function listMovies(req: Request, res: Response): Promise<any> {
  try {
    const cacheKey = 'allMovies';
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const movies = await getAllMovies();
    setCache(cacheKey, movies);

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to list movies' });
  }
}

export async function search(req: Request, res: Response): Promise<any> {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    const movies = await searchMovies(query);
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to search movies' });
  }
}

export async function addMovie(req: Request, res: Response): Promise<any> {
  try {
    // Only "admin" can add
    // This check is done in the middleware, but you could re-check here if needed
    const newMovie = await createMovie(req.body);
    return res.status(201).json(newMovie);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add movie' });
  }
}

export async function editMovie(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const updated = await updateMovie(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update movie' });
  }
}

export async function removeMovie(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const deleted = await deleteMovie(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete movie' });
  }
}
