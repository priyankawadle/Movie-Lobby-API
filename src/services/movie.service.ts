
import Movie, { IMovie } from '../models/movie.model';

export async function getAllMovies(): Promise<IMovie[]> {
  return Movie.find({});
}

export async function searchMovies(query: string): Promise<IMovie[]> {
  const regex = new RegExp(query, 'i');
  return Movie.find({
    $or: [{ title: regex }, { genre: regex }]
  });
}

export async function createMovie(movieData: Partial<IMovie>): Promise<IMovie> {
  return Movie.create(movieData);
}

export async function updateMovie(id: string, movieData: Partial<IMovie>): Promise<IMovie | null> {
  return Movie.findByIdAndUpdate(id, movieData, { new: true });
}

export async function deleteMovie(id: string): Promise<IMovie | null> {
  return Movie.findByIdAndDelete(id);
}
