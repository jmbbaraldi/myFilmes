import { useFavorites } from '../../providers/FavoritesProvider';
import MovieCard from '../../components/MovieCard';
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-container">
      <h1>Meus Filmes Favoritos</h1>
      
      {favorites.length === 0 ? (
        <p className="favorites-empty">Você ainda não tem filmes favoritos.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              showDetailsButton={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;