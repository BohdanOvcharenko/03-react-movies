import type { Movie } from '../types/movie';
import axios from 'axios';

const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      }
    }
  );
  

  return response.data.results;
};

export default fetchMovies;