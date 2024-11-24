// props validation
import PropTypes from "prop-types";

const SearchBar = ({ setSearchBarFilter }) => {
  const handleInput = (e) => {
    const filter = e.target.value;
    setSearchBarFilter(filter.trim().toLowerCase());
  };

  return (
    <div>
      <input
        type="text"
        className="w-full rounded-xl border border-gray-400 px-4 py-2.5 focus:outline-[#b0181c] min-[700px]:w-64"
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
