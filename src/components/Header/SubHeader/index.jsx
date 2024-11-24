// React & Hooks
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Components
import Button from "src/components/Button";

// PropTypes
import PropTypes from "prop-types";

const links = [
  {
    text: "Ajout des cours",
    path: "/admin/courses/add-course",
    iconPathD:
      "M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z",
    id: 1,
  },
  {
    text: "Vue d'ensemble",
    path: "/admin/courses/overview",
    iconPathD:
      "M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H200Zm0-80h560v-160H200v160Zm0 480q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h560q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H200Zm0-80h560v-160H200v160Zm0-560v160-160Zm0 400v160-160Z",
    id: 2,
  },
];

const SubHeader = ({ setShowMenu, showMenu, openSignOutModal }) => {
  const location = useLocation();
  const [showSubMenu, setShowSubMenu] = useState(true);

  const handleClickHideMenu = () => {
    setShowMenu(false);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <nav
      className={`${
        showMenu ? "translate-x-0" : "-translate-x-full"
      } fixed left-0 top-0 flex h-full w-full flex-col justify-evenly bg-white px-8 transition-transform duration-300 ease-out md:px-10 lg:w-auto lg:border-r lg:border-black xl:hidden`}
    >
      <ul className="flex flex-col justify-center gap-y-7 text-2xl font-medium">
        <li className="transition-colors hover:text-[#b0181c]">
          <NavLink
            to="/"
            onClick={handleClickHideMenu}
            className="flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill={location.pathname === "/" ? "#b0181c" : "#000"}
              className="mr-3"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
            Tableau de bord
          </NavLink>
        </li>

        <li
          className={`${showSubMenu ? "h-[117px]" : "h-[32px]"} overflow-hidden transition-all`}
        >
          <div className="group flex items-center" onClick={toggleSubMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000"
              className="mr-3 group-hover:text-[#b0181c]"
            >
              <path
                d={
                  showSubMenu
                    ? "M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
                    : "M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"
                }
              />
            </svg>

            <span className="cursor-pointer tracking-wide transition-colors group-hover:text-[#b0181c]">
              Gestion des cours
            </span>
          </div>

          <ul className="mt-4 space-y-3 pl-8 text-xl">
            {links.map((link) => (
              <li
                key={link.id}
                className="transition-colors hover:text-[#b0181c] xl:cursor-pointer"
              >
                <NavLink
                  className="flex items-center"
                  to={link.path}
                  onClick={handleClickHideMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill={location.pathname === link.path ? "#b0181c" : "#000"}
                    className="mr-3"
                  >
                    <path d={link.iconPathD} />
                  </svg>

                  <span>{link.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <div>
        <Button
          className="bg-[#b0181c] !py-3 text-white"
          onClick={openSignOutModal}
        >
          <i className="fa-solid fa-arrow-right-from-bracket mr-3"></i>
          Se déconnecter
        </Button>
      </div>

      <i
        onClick={handleClickHideMenu}
        className="fa-solid fa-xmark absolute right-3 top-3 flex w-[48px] items-center justify-center rounded-full py-1 text-3xl transition-colors hover:bg-slate-100 lg:hidden"
      ></i>
    </nav>
  );
};

SubHeader.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  openSignOutModal: PropTypes.func,
};

export default SubHeader;
