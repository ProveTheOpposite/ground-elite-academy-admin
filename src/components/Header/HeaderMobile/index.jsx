// React & Hooks
import { useState } from "react";
import { NavLink } from "react-router-dom";

// Components
import Button from "src/components/Button";

// PropTypes
import PropTypes from "prop-types";

const HeaderMobile = ({ setShowMenu, showMenu, openSignOutModal }) => {
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
      } fixed left-0 top-0 flex h-full w-full flex-col justify-evenly bg-white px-8 transition-transform duration-300 ease-out md:px-16 xl:hidden`}
    >
      <ul className="flex flex-col justify-center gap-y-7 text-2xl font-medium">
        <li className="transition-colors hover:text-[#b0181c]">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-[#b0181c]"
                : "cursor-pointer tracking-wide"
            }
            to="/"
            onClick={handleClickHideMenu}
          >
            <i className={`fa-solid fa-house mr-4 w-[30px]`}></i>
            Tableau de bord
          </NavLink>
        </li>

        <li
          className={`${showSubMenu ? "h-[117px]" : "h-[32px]"} overflow-hidden transition-all`}
        >
          <div className="group" onClick={toggleSubMenu}>
            <i
              className={`fa-solid ${showSubMenu ? "fa-chevron-down" : "fa-calendar-days"} mr-4 w-[30px] transition-colors group-hover:text-[#b0181c]`}
            ></i>

            <span className="cursor-pointer tracking-wide transition-colors group-hover:text-[#b0181c]">
              Gestion des cours
            </span>
          </div>

          <ul className="mt-4 space-y-3 pl-8 text-xl">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[#b0181c]"
                    : "tracking-wide transition-colors hover:text-[#b0181c]"
                }
                to="/admin/courses/add-course"
                onClick={handleClickHideMenu}
              >
                <i className="fa-solid fa-calendar-days mr-2 w-[30px]"></i>
                Ajouter un cours
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-[#b0181c]"
                    : "tracking-wide transition-colors hover:text-[#b0181c]"
                }
                to="/admin/courses/overview"
                onClick={handleClickHideMenu}
              >
                <i className="fa-solid fa-eye mr-2 w-[30px]"></i>
                Vue d&apos;ensemble
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>

      <div className="flex flex-col items-start gap-y-8">
        <Button
          className="bg-[#b0181c] !text-lg text-white"
          onClick={openSignOutModal}
        >
          Se déconnecter
        </Button>
      </div>

      <i
        onClick={handleClickHideMenu}
        className="fa-solid fa-xmark absolute right-3 top-3 flex w-[48px] items-center justify-center rounded-full py-1 text-3xl transition-colors hover:bg-slate-100"
      ></i>
    </nav>
  );
};

HeaderMobile.propTypes = {
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  openSignOutModal: PropTypes.func,
};

export default HeaderMobile;
