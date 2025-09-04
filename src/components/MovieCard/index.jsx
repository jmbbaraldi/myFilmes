import { useFavorites } from '../../providers/FavoritesProvider';
import { getImageUrl } from '../../services/tmdb';
import './MovieCard.css';

const MovieCard = ({ movie, showDetailsButton = true }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="movie-card">
      <img 
        src={getImageUrl(movie.poster_path) || '/placeholder-movie.jpg'} 
        alt={movie.title}
        className="movie-card-poster"
      />
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-year">{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</p>
        
        <div className="movie-card-actions">
          {showDetailsButton && (
            <a href={`/movie/${movie.id}`} className="movie-card-detailsButton">
              Ver Detalhes
            </a>
          )}
          <button 
            onClick={handleFavoriteClick}
            className={`movie-card-favoriteButton ${favorite ? 'movie-card-favorited' : ''}`}
            aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {favorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;