// React & Hooks
import { useState } from "react";
import { Link } from "react-router-dom";

// State Management

// Components
import Button from "src/components/Button";

// PropTypes
import PropTypes from "prop-types";

const HeaderMobile = ({ setShowMenu, showMenu, openSignOutModal }) => {
  // Nouvel état pour le sous-menu de "Gestion des cours"
  const [showSubMenu, setShowSubMenu] = useState(true);

  const handleClickHideMenu = () => {
    setShowMenu(false);
  };

  // Fonction pour basculer le sous-menu
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
        {/* Lien Tableau de bord */}
        <li className="transition-colors hover:text-[#b0181c]">
          <i className={`fa-solid fa-house mr-4 w-[30px]`}></i>

          <Link
            to="/"
            className="cursor-pointer tracking-wide"
            onClick={handleClickHideMenu}
          >
            Tableau de bord
          </Link>
        </li>

        {/* Lien Gestion des cours avec sous-menu */}
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

          {/* Sous-menu, conditionnellement visible */}
          <ul className="mt-4 space-y-3 pl-8 text-xl">
            <li>
              <Link
                to="/admin/courses/add-course"
                className="tracking-wide transition-colors hover:text-[#b0181c]"
                onClick={handleClickHideMenu}
              >
                <i className="fa-solid fa-calendar-days mr-2 w-[30px]"></i>
                Ajouter un cours
              </Link>
            </li>

            <li>
              <Link
                to="/admin/courses/overview"
                className="tracking-wide transition-colors hover:text-[#b0181c]"
                onClick={handleClickHideMenu}
              >
                <i className="fa-solid fa-eye mr-2 w-[30px]"></i>
                Vue d&apos;ensemble
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      {/* Bouton de déconnexion */}
      <div className="flex flex-col items-start gap-y-8">
        <Button
          className="bg-[#b0181c] !text-lg text-white"
          onClick={openSignOutModal}
        >
          Se déconnecter
        </Button>
      </div>

      {/* Bouton pour fermer le menu */}
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
