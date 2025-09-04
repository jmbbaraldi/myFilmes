import { useState, useEffect } from 'react';
import { getPopularMovies } from '../../services/tmdb';
import MovieCard from '../../components/MovieCard';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import './Home.css';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(1); 
        setPopularMovies(data.results.slice(0, 12));
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar filmes populares:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="home-container">
      <section className="home-hero">
        <h1>Bem-vindo ao myMovies</h1>
        <p>Descubra, explore e salve seus filmes favoritos</p>
      </section>

      <section className="home-popularSection">
        <h2>Filmes Populares</h2>
        
        {loading && <Loading />}
        
        {error && <ErrorMessage message={error} />}

        {!loading && !error && popularMovies.length > 0 && (
          <div className="home-moviesGrid">
            {popularMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!loading && !error && popularMovies.length === 0 && (
          <p className="home-noResults">Nenhum filme popular encontrado.</p>
        )}
      </section>
    </div>
  );
};

export default Home;