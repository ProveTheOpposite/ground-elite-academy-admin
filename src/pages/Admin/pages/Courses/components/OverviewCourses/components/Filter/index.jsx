// hook
import { useSetRecoilState } from "recoil";
// atom
import { filtersCoursesState } from "src/recoil";
// prop types
import PropTypes from "prop-types";

const filtersBtn = [
  {
    text: "Date des cours",
    typeNode: "date",
    id: 0,
  },
  {
    text: "Catégorie des cours",
    typeNode: "selector",
    id: 1,
  },
];

const Filter = ({ filterClickedRef }) => {
  const setFiltersCourses = useSetRecoilState(filtersCoursesState);

  const handleClickAddFilter = (newFilter) => {
    setFiltersCourses((currentFilters) => {
      const filterExists = currentFilters.some(
        (filter) => filter.text === newFilter.text,
      );

      return filterExists ? currentFilters : [...currentFilters, newFilter];
    });
  };

  return (
    <div
      ref={filterClickedRef}
      className="absolute right-5 top-8 z-10 flex flex-col gap-y-2 rounded-xl bg-white p-5 shadow-2xl"
    >
      {filtersBtn.map((filter) => (
        <div
          className="cursor-pointer rounded-md p-2 transition-colors hover:bg-slate-100"
          onClick={() => handleClickAddFilter(filter)}
          key={filter.id}
        >
          <i
            className={`fa-solid fa-${filter.typeNode === "date" ? "clock" : "layer-group"} mr-3`}
          ></i>
          {filter.text}
        </div>
      ))}
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filterClickedRef: PropTypes.object.isRequired,
};
