import { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.find(movie => movie.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== action.payload)
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useLocalStorage('favorites', []);
  const [state, dispatch] = useReducer(favoritesReducer, {
    favorites: storedFavorites
  });

  useEffect(() => {
    setStoredFavorites(state.favorites);
  }, [state.favorites, setStoredFavorites]);

  const addFavorite = (movie) => {
    dispatch({ type: 'ADD_FAVORITE', payload: movie });
  };

  const removeFavorite = (movieId) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: movieId });
  };

  const isFavorite = (movieId) => {
    return state.favorites.some(movie => movie.id === movieId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites: state.favorites,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};