import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getImageUrl } from '../../services/tmdb';
import { useFavorites } from '../../providers/FavoritesProvider';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(parseInt(id));

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id)
        ]);
        
        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar detalhes do filme:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Filme não encontrado" />;

  const director = credits?.crew?.find(person => person.job === 'Director');
  const mainCast = credits?.cast?.slice(0, 10) || [];

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <img 
          src={getImageUrl(movie.poster_path) || '/placeholder-movie.jpg'} 
          alt={movie.title}
          className="movie-details-poster"
        />
        
        <div className="movie-details-info">
          <h1>{movie.title}</h1>
          <p className="movie-details-tagline">{movie.tagline}</p>
          
          <div className="movie-details-metadata">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
            <span className="movie-details-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
          </div>

          <button 
            onClick={handleFavoriteClick}
            className={`movie-details-favoriteButton ${favorite ? 'movie-details-favorited' : ''}`}
          >
            {favorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </button>

          <div className="movie-details-genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="movie-details-genre">{genre.name}</span>
            ))}
          </div>

          <h3>Sinopse</h3>
          <p className="movie-details-overview">{movie.overview || 'Sinopse não disponível.'}</p>
        </div>
      </div>

      <div className="movie-details-details">
        {director && (
          <div className="movie-details-detailSection">
            <h3>Diretor</h3>
            <p>{director.name}</p>
          </div>
        )}

        {mainCast.length > 0 && (
          <div className="movie-details-detailSection">
            <h3>Elenco Principal</h3>
            <div className="movie-details-cast">
              {mainCast.map(actor => (
                <div key={actor.id} className="movie-details-actor">
                  <img 
                    src={getImageUrl(actor.profile_path) || '/placeholder-actor.jpg'} 
                    alt={actor.name}
                    className="movie-details-actorImage"
                  />
                  <p>{actor.name}</p>
                  <span className="movie-details-character">{actor.character}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;