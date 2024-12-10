// hook
import { useRecoilState } from "recoil";
// atom
import { filtersCoursesState } from "src/recoil";
// props validation
import PropTypes from "prop-types";

const SearchBars = ({
  setSearchBarFilter,
  setDateFilter,
  setCategoryFilter,
}) => {
  const [filtersCourses, setFiltersCourses] =
    useRecoilState(filtersCoursesState);

  const handleInputSearchCourses = (e) => {
    const searchBarFilter = e.target.value;
    setSearchBarFilter(searchBarFilter.trim().toLowerCase());
  };

  const handleInputDate = (e) => {
    const dateFilter = e.target.value;
    setDateFilter(dateFilter);
  };

  const handleSelectCategory = (e) => {
    const categoryFilter = e.target.value;
    setCategoryFilter(categoryFilter);
  };

  const handleClickRemoveFilter = (typeFilter, setter) => {
    setFiltersCourses((currentFilter) =>
      currentFilter.filter((filter) => filter.typeNode !== typeFilter),
    );
    setter();
    console.log(typeFilter);
  };

  return (
    <div className="flex flex-col gap-y-5 min-[700px]:flex-row min-[700px]:flex-wrap min-[700px]:gap-x-5">
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass pt absolute left-3 top-[14.9px] text-gray-400"></i>

        <input
          type="text"
          className="w-full rounded-xl border border-gray-400 px-9 py-2.5 focus:outline-[#b0181c] min-[700px]:w-64"
          placeholder="Rechercher cours..."
          onInput={handleInputSearchCourses}
        />
      </div>

      {filtersCourses
        .slice() // create copy to avoid to modify the state
        .sort((a, b) => {
          if (a.typeNode === "date" && b.typeNode !== "date") return -1;
          if (a.typeNode !== "date" && b.typeNode === "date") return 1;
          return 0;
        })
        .map((filter) =>
          filter.typeNode === "date" ? (
            <div
              key={filter.id}
              className="flex items-center gap-x-4 pr-2 min-[700px]:pr-0"
            >
              <input
                type="date"
                className="w-full rounded-xl border border-gray-400 px-4 py-2.5 focus:outline-[#b0181c] min-[700px]:w-64"
                onInput={handleInputDate}
              />

              <i
                onClick={() =>
                  handleClickRemoveFilter(filter.typeNode, () =>
                    setDateFilter(""),
                  )
                }
                className="fa-regular fa-square-minus cursor-pointer text-xl"
              ></i>
            </div>
          ) : (
            <div
              key={filter.id}
              className="flex items-center gap-x-4 pr-2 min-[700px]:pr-0"
            >
              <select
                onInput={handleSelectCategory}
                className="w-full cursor-pointer rounded-xl border border-gray-400 px-4 py-2.5 focus:outline-[#b0181c] min-[700px]:w-64"
              >
                <option value=""></option>
                <option value="Lutte">Lutte</option>
                <option value="Grappling">Grappling</option>
                <option value="Autre">Autre</option>
              </select>

              <i
                onClick={() =>
                  handleClickRemoveFilter(filter.typeNode, () =>
                    setCategoryFilter(""),
                  )
                }
                className="fa-regular fa-square-minus cursor-pointer text-xl"
              ></i>
            </div>
          ),
        )}
    </div>
  );
};

SearchBars.propTypes = {
  setSearchBarFilter: PropTypes.func.isRequired,
  setDateFilter: PropTypes.func.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
};

export default SearchBars;
