// props validation
import PropTypes from "prop-types";

const SearchBar = ({ setSearchBarFilter }) => {
  const handleInput = (e) => {
    const filter = e.target.value;
    setSearchBarFilter(filter.trim().toLowerCase());
  };

  return (
    <div className="md:hidden">
      <input
        type="text"
        className="border-b border-gray-400 px-2 pb-0.5 outline-none"
        placeholder="Rechercher..."
        onInput={handleInput}
      />
    </div>
  );
};

SearchBar.propTypes = {
  setSearchBarFilter: PropTypes.func.isRequired,
};

export default SearchBar;
