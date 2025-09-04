import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-bar-input"
      />
      <span className="search-bar-icon">🔍</span>
    </div>
  );
};

export default SearchBar;