// props validation
import PropTypes from "prop-types";

const SearchBar = ({ setSearchBarFilter }) => {
  const handleInput = (e) => {
    const filter = e.target.value;
    setSearchBarFilter(filter.trim().toLowerCase());
  };

  return (
    <div className="md:absolute md:left-14">
      <input
        type="text"
        className="rounded-none border-b border-gray-400 px-2 pb-0.5 outline-none md:w-32 lg:w-44 2xl:w-52"
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
