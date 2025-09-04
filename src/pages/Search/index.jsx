import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdb';
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import './Search.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(searchQuery, page);
      setResults(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(data.page);
    } catch (err) {
      setError(err.message);
      console.error('Erro na busca:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
      search(queryParam, 1);
    }
  }, [queryParam]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setSearchParams({ q: searchQuery });
  };

  const handlePageChange = (page) => {
    search(query, page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="search-container">
      <h1>Buscar Filmes</h1>
      
      <SearchBar 
        value={query}
        onChange={handleSearch}
        placeholder="Digite o nome de um filme..."
      />

      {loading && <Loading />}
      
      {error && <ErrorMessage message={error} />}

      {!loading && !error && results.length > 0 && (
        <>
          <div className="search-resultsGrid">
            {results.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {!loading && !error && query && results.length === 0 && (
        <p className="search-noResults">Nenhum filme encontrado para "{query}"</p>
      )}
    </div>
  );
};

export default Search;