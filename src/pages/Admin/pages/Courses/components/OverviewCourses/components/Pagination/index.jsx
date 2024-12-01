// hook
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
// components
import SubMenuItemsPerPage from "./SubMenuItemsPerPage";
// atom
import { eventsScheduleState } from "src/recoil";
// prop types
import PropTypes from "prop-types";
import { useState } from "react";

const Pagination = ({
  onPaginate,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  currentItems,
  indexOfFirstItem,
  indexOfLastItem,
  elemRef,
  subMenuItemsPerPageClickedRef,
}) => {
  const [mobileElemRef, setMobileElemRef] = useState("");
  const [desktopElemRef, setDesktopElemRef] = useState("");

  const eventsSchedule = useRecoilValue(eventsScheduleState);

  const totalPages = Math.ceil(eventsSchedule.length / itemsPerPage);

  // update if events schedule change
  useEffect(() => {
    if (eventsSchedule.length > 0) {
      onPaginate(currentItems);
    }
  }, [currentPage, itemsPerPage, eventsSchedule, onPaginate]);

  // function to displays the buttons of the pagination
  const getPageNumbers = () => {
    const range = 2;
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    // if the current page is near to the start
    if (currentPage <= range) {
      end = Math.min(totalPages, end + (range - currentPage + 1));
    }

    // if the current page is near to the end
    if (currentPage + range > totalPages) {
      start = Math.max(1, start - (currentPage + range - totalPages));
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    const handleClickOutsideMobile = (e) => {
      if (
        subMenuItemsPerPageClickedRef.current &&
        !subMenuItemsPerPageClickedRef.current.contains(e.target)
      ) {
        setMobileElemRef("");
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMobile);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobile);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideDesktop = (e) => {
      if (
        subMenuItemsPerPageClickedRef.current &&
        !subMenuItemsPerPageClickedRef.current.contains(e.target)
      ) {
        setDesktopElemRef("");
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDesktop);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDesktop);
    };
  }, []);

  // function to change the number of items per page on mobile
  const handleMobileChangeItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.lastElementChild.innerText));
    setCurrentPage(1);
    setMobileElemRef("");
  };

  // function to change the number of items per page on desktop
  const handleDesktopChangeItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.lastElementChild.innerText));
    setCurrentPage(1);
    setDesktopElemRef("");
  };

  // function to switch to the previous page
  const handleClickPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // function to switch to the next page
  const handleClickNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(eventsSchedule.length / itemsPerPage)),
    );
  };

  return (
    <div className="flex items-center justify-center px-2 pt-4 md:justify-end md:pt-5">
      {/* mobile */}
      <div className="flex max-w-full flex-col items-center gap-y-4 md:hidden">
        <div className="flex max-h-full flex-wrap items-center gap-x-2 text-sm font-semibold md:text-base">
          <button
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100"
            onClick={handleClickPrevPage}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page
                  ? "flex h-7 w-7 items-center justify-center rounded-full bg-[#b1081c] text-white"
                  : "flex h-7 w-7 items-center justify-center rounded-full hover:bg-red-300"
              }
            >
              {page}
            </button>
          ))}

          <button
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100"
            onClick={handleClickNextPage}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setMobileElemRef("subMenuItemsPerPage")}
            type="button"
            className="flex items-center rounded-xl border-2 border-gray-400 px-3 py-2 text-slate-600 focus:outline-[#b0181c]"
          >
            <span className="mr-1 font-semibold">{itemsPerPage}</span>
            <span>par page</span>
            <i
              className={`fa-solid fa-chevron-down ${elemRef === "subMenuItemsPerPage" ? "rotate-180" : "rotate-0"} ml-3 transition-transform duration-200`}
            ></i>
          </button>

          {mobileElemRef === "subMenuItemsPerPage" && (
            <SubMenuItemsPerPage
              subMenuItemsPerPageClickedRef={subMenuItemsPerPageClickedRef}
              handleClickChangeNumberItemsPerPage={
                handleMobileChangeItemsPerPage
              }
            />
          )}
        </div>

        <div className="text-sm md:text-base">
          <span className="font-semibold">
            {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, eventsSchedule.length)}
          </span>{" "}
          sur {eventsSchedule.length}
        </div>
      </div>

      {/* tablette, desktop */}
      <div className="hidden md:flex md:gap-x-3">
        <div className="relative">
          <button
            onClick={() => setDesktopElemRef("subMenuItemsPerPage")}
            type="button"
            className="flex items-center rounded-xl border-2 border-gray-400 px-3 py-2 text-slate-600 outline-none"
          >
            <span className="mr-1 font-semibold">{itemsPerPage}</span>
            <span>par page</span>
            <i
              className={`fa-solid fa-chevron-down ${elemRef === "subMenuItemsPerPage" ? "rotate-180" : "rotate-0"} ml-3 transition-transform duration-200`}
            ></i>
          </button>

          {desktopElemRef === "subMenuItemsPerPage" && (
            <SubMenuItemsPerPage
              subMenuItemsPerPageClickedRef={subMenuItemsPerPageClickedRef}
              handleClickChangeNumberItemsPerPage={
                handleDesktopChangeItemsPerPage
              }
            />
          )}
        </div>

        <div className="flex rounded-xl border-2 border-gray-400 text-slate-600">
          <div className="border-r border-gray-400 px-3 py-2">
            <span className="font-semibold">
              {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, eventsSchedule.length)}
            </span>{" "}
            sur {eventsSchedule.length}
          </div>

          <div className="flex w-20 items-start">
            <button
              onClick={handleClickPrevPage}
              className="h-full flex-1 px-2 outline-none transition-colors hover:bg-gray-200"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button
              onClick={handleClickNextPage}
              className="h-full flex-1 rounded-ee-xl rounded-se-xl px-2 outline-none transition-colors hover:bg-gray-200"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  onPaginate: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
  currentItems: PropTypes.array.isRequired,
  indexOfFirstItem: PropTypes.number.isRequired,
  indexOfLastItem: PropTypes.number.isRequired,
  elemRef: PropTypes.string.isRequired,
  subMenuItemsPerPageClickedRef: PropTypes.object.isRequired,
};
