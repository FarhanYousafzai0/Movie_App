import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import './globals.css';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MoviesCard from './components/MoviesCard';
import { getTrendingMovies, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`, // Fixed Authorization header
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesList, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Fixed variable name
  const [checkError, setCheckError] = useState('');
  const [debounce, setDebounceSearchTerm] = useState('');
const [trendingMovies,setTrendingMovies]= useState([]);
  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true); // Indicate loading at the start
    setCheckError(''); // Clear any previous errors

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies.');
      }

      const data = await response.json();
      setMovies(data.results || []); // Safely update the movies list

      if(query && data.results || []){
        await updateSearchCount(query,data.results[0])
      }
      // Call updateSearchCount with the searchTerm and movie data for each movie
      if (data.results && data.results.length > 0) {
        data.results.forEach((movie) => {
          updateSearchCount(query, movie); // Pass searchTerm (query) and movie
        });
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setCheckError('Error fetching movies. Try again later.');
    } finally {
      setIsLoading(false); // Stop loading in all cases
    }
  };

  const loadTrendingMovies = async () => {
  try {
    // Call getTrendingMovies and wait for the response
    const movies = await getTrendingMovies();

    // Check if movies are returned and set them in the state
    if (movies && movies.length > 0) {
      setTrendingMovies(movies);
    } else {
      console.warn('No trending movies found.');
    }
  } catch (error) {
    console.error('Error loading trending movies:', error);
  }
};

  useEffect(() => {
    fetchMovies(debounce); // Pass the debounced search term
  }, [debounce]); // Trigger whenever the debounced search term changes


  useEffect(() => {
    loadTrendingMovies(); // Fixed function call
  }, []);
  
  return (
    <main >
<div
  className="pattern w-screen h-screen bg-center bg-cover absolute z-0 bg-[url('./background-lines.png')]"
></div>
     
      <div className="wrapper">
        <header className="text-center">
          <img src="./hero-img.png" alt="Hero" />
          <h1 className="capitalize">
            Find <span className="text-gradient">movies</span> you'll enjoy without the hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>


        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending <span className='text-gradient'>Movies</span></h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies ">
          <h2 className="text-white">
            Popular <span className="text-gradient text-start">Movies</span>
          </h2>
          {isLoading ? (
            <Spinner />
          ) : checkError ? (
            <p className="text-red">{checkError}</p>
          ) : (
            <ul className="data">
              {moviesList.map((movie) => (
                <MoviesCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;