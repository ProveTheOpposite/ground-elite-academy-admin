import React from "react";

// hook
import { useNavigate } from "react-router-dom";

// react router dom
import { Link } from "react-router-dom";

// props validation
import PropTypes from "prop-types";

const Event = ({
  id,
  t,
  s,
  e,
  typeEvent,
  selectedCourses,
  setSelectedCourses,
}) => {
  const navigate = useNavigate();

  // Handle individual checkbox change
  const handleSelectCourse = (id) => {
    setSelectedCourses((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id],
    }));
  };

  // Handle click to navigate
  const handleClickNavigate = () => {
    navigate(`/admin/edit-course/${id}`);
  };

  // format dates
  const formatDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatHour = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`${typeEvent === "Lutte" ? "border-blue-500" : typeEvent === "Grappling" ? "border-[#b0181c]" : "border-yellow-600"} ${window.innerWidth >= 768 ? "cursor-pointer hover:bg-slate-100" : ""} flex items-center justify-between gap-x-5 border-b border-l-4 border-r border-b-slate-400 border-r-slate-400 py-3 pl-4 pr-7 last:rounded-ee-xl last:rounded-es-xl md:py-4 md:pr-8`}
      onClick={window.innerWidth >= 768 ? handleClickNavigate : undefined}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-x-5 md:flex-1 md:items-center md:justify-between">
          <div className="relative flex items-center md:flex-auto">
            <input
              type="checkbox"
              className="absolute h-[18px] w-[18px] cursor-pointer opacity-0"
              checked={selectedCourses[id] || false}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={() => handleSelectCourse(id)}
            />

            <div
              className={`flex h-[18px] w-[18px] items-center justify-center rounded-[4px] transition-colors duration-200 ${selectedCourses[id] || false ? "bg-blue-500" : "border border-slate-400"}`}
            >
              {selectedCourses[id] && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#fff"
                >
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              )}
            </div>
          </div>

          {/* Display on mobile */}
          <div className="flex flex-col md:hidden">
            <span className="mb-2 min-w-[84px] font-bold">{t}</span>

            <div className="flex flex-col text-gray-600">
              <span className="min-w-[102px]">
                De <strong>{formatHour(s).replace(":", "h")}</strong> le{" "}
                <strong>{formatDate(s)}</strong>
              </span>

              <span className="min-w-[102px]">
                à <strong>{formatHour(e).replace(":", "h")}</strong> le{" "}
                <strong>{formatDate(e)}</strong>
              </span>
            </div>
          </div>

          {/* Display au-dessus de tablette */}
          <span className="hidden md:flex md:min-w-[84px] md:flex-1 md:font-semibold">
            {t}
          </span>

          <span className="hidden text-[#444] md:flex md:min-w-[102px] md:flex-1">
            {formatHour(s).replace(":", "h")} le {formatDate(s)}
          </span>

          <span className="hidden text-[#444] md:flex md:min-w-[102px] md:flex-1">
            {formatHour(e).replace(":", "h")} le {formatDate(e)}
          </span>
        </div>

        <div className="md:hidden">
          <Link to={`/admin/edit-course/${id}`}>
            <i className="fa-solid fa-pen rounded-full p-2 text-gray-600 transition-colors hover:bg-sky-100"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.string.isRequired,
  s: PropTypes.string.isRequired,
  e: PropTypes.string.isRequired,
  typeEvent: PropTypes.string.isRequired,
  selectedCourses: PropTypes.object.isRequired,
  setSelectedCourses: PropTypes.func.isRequired,
};

export default React.memo(Event);
