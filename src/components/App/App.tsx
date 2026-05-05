import SearchBar from '../SearchBar/SearchBar'
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import toast from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import css from './App.module.css';



function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

   const handleSearch = async (query: string) => {
     setMovies([]);
     setLoading(true);
     setError(false);

     try {
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(data);
     } catch (error) {
       console.error(error);
      setError(true);
     }
     finally {      setLoading(false);
     }
  };
  

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={movies} onSelect={(movie) => {
          setSelectedMovie(movie);
        }} />
      )}
      {loading && <Loader />}
      {selectedMovie && (
  <MovieModal
    movie={selectedMovie}
    onClose={() => setSelectedMovie(null)}
  />
)}
    </div>
  )
}

export default App
