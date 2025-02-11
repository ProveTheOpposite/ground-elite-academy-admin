// React & Hooks
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Components
import Button from "src/components/Button";

// PropTypes
import PropTypes from "prop-types";

const linksCourses = [
  {
    text: "Ajouter un cours",
    path: "/admin/add-course",
    iconPathD:
      "M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z",
    iconPathDActive:
      "M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z",
    id: 1,
  },
  {
    text: "Vue d'ensemble",
    path: "/admin/overview-courses",
    iconPathD:
      "M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H200Zm0-80h560v-160H200v160Zm0 480q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h560q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H200Zm0-80h560v-160H200v160Zm0-560v160-160Zm0 400v160-160Z",
    iconPathDActive:
      "M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H200Zm0 400q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h560q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H200Z",
    id: 2,
  },
];

const linksArticle = [
  {
    text: "Créer un article",
    path: "/admin/create-article",
    iconPathD:
      "M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z",
    iconPathDActive:
      "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-160h200q17 0 28.5-11.5T560-320q0-17-11.5-28.5T520-360H320q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160h320q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160h320q17 0 28.5-11.5T680-640q0-17-11.5-28.5T640-680H320q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Z",
    id: 1,
  },
  {
    text: "Vue d'ensemble",
    path: "/admin/overview-articles",
    iconPathD:
      "M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z",
    iconPathDActive:
      "M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520Z",
    id: 2,
  },
];

const SubHeader = ({ setShowMenu, showMenu, openSignOutModal }) => {
  const location = useLocation();
  const [showSubMenu, setShowSubMenu] = useState("courses");

  const handleClickHideMenu = () => {
    setShowMenu(false);
  };

  const toggleSubMenu = (typeMenu) => {
    setShowSubMenu((prev) => (prev === typeMenu ? null : typeMenu));
  };

  return (
    <nav
      className={`${
        showMenu ? "translate-x-0" : "-translate-x-full"
      } fixed left-0 top-0 flex h-full w-full flex-col justify-evenly bg-white px-8 transition-transform duration-300 ease-out md:px-10 lg:w-auto lg:border-r lg:border-black xl:hidden`}
    >
      <ul className="flex flex-col justify-center gap-y-5 text-2xl font-medium">
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
              <path
                d={
                  location.pathname === "/"
                    ? "M560-600q-17 0-28.5-11.5T520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560ZM160-440q-17 0-28.5-11.5T120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160Zm400 320q-17 0-28.5-11.5T520-160v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560Zm-400 0q-17 0-28.5-11.5T120-160v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160Z"
                    : "M520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560q-17 0-28.5-11.5T520-640ZM120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160q-17 0-28.5-11.5T120-480Zm400 320v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560q-17 0-28.5-11.5T520-160Zm-400 0v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160q-17 0-28.5-11.5T120-160Zm80-360h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"
                }
              />
            </svg>
            Tableau de bord
          </NavLink>
        </li>

        <li
          className={`${showSubMenu === "courses" ? "h-[117px]" : "h-[32px]"} overflow-hidden transition-all`}
        >
          <div
            className="group flex items-center"
            onClick={() => toggleSubMenu("courses")}
          >
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
                  showSubMenu === "courses"
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
            {linksCourses.map((link) => (
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
                    <path
                      d={
                        location.pathname === link.path
                          ? link.iconPathDActive
                          : link.iconPathD
                      }
                    />
                  </svg>

                  <span>{link.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </li>

        <li
          className={`${showSubMenu === "articles" ? "h-[117px]" : "h-[32px]"} overflow-hidden transition-all`}
        >
          <div
            className="group flex items-center"
            onClick={() => toggleSubMenu("articles")}
          >
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
                  showSubMenu === "articles"
                    ? "M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
                    : "M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"
                }
              />
            </svg>

            <span className="cursor-pointer tracking-wide transition-colors group-hover:text-[#b0181c]">
              Gestion des articles
            </span>
          </div>

          <ul className="mt-4 space-y-3 pl-8 text-xl">
            {linksArticle.map((link) => (
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
                    <path
                      d={
                        location.pathname === link.path
                          ? link.iconPathDActive
                          : link.iconPathD
                      }
                    />
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
          className="bg-[#b0181c] px-7 text-white"
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
