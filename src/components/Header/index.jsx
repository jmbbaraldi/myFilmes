import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          🎬 myMovies
        </Link>
        
        <nav className="header-nav">
          <Link to="/" className="header-navLink">Início</Link>
          <Link to="/search" className="header-navLink">Buscar</Link>
          <Link to="/favorites" className="header-navLink">Favoritos</Link>
        </nav>

        <form onSubmit={handleSearch} className="header-searchForm">
          <input
            type="text"
            placeholder="Buscar filmes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header-searchInput"
          />
          <button type="submit" className="header-searchButton">
            🔍
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;