// propTypes
import PropTypes from "prop-types";

const itemsPagination = [
  { quantities: "10", id: 0 },
  { quantities: "20", id: 1 },
  { quantities: "25", id: 2 },
];

const SubMenuItemsPerPage = ({
  subMenuItemsPerPageClickedRef,
  handleClickChangeNumberItemsPerPage,
}) => {
  return (
    <div
      ref={subMenuItemsPerPageClickedRef}
      className="absolute right-0 top-full flex w-full flex-col gap-y-1 rounded-xl border border-gray-300 bg-white p-2 text-slate-600"
    >
      {itemsPagination.map((item) => (
        <span
          onClick={handleClickChangeNumberItemsPerPage}
          key={item.id}
          className="cursor-pointer rounded-lg py-1.5 text-center transition-colors hover:bg-slate-100"
        >
          <span className="font-semibold">{item.quantities}</span> par page
        </span>
      ))}
    </div>
  );
};

export default SubMenuItemsPerPage;

SubMenuItemsPerPage.propTypes = {
  subMenuItemsPerPageClickedRef: PropTypes.object.isRequired,
  handleClickChangeNumberItemsPerPage: PropTypes.func.isRequired,
};
