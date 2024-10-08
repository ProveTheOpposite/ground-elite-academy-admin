// React & Hooks
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

// firebase
import { getAuth, signOut } from "firebase/auth";

// atom
import { isHeaderHiddenState, openModalState } from "src/recoil";

// Components
import Button from "../Button";
import Confirmation from "../Confirmation";
import Modal from "../Modal";
import HeaderMobile from "./HeaderMobile";

// PropTypes
import PropTypes from "prop-types";

// Assets & Translations
import { imageUrl } from "src/assets/images/imagesList";

const Header = () => {
  const [isHeaderMobileVisible, setIsHeaderMobileVisible] = useState(false);

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const [isHidden, setIsHidden] = useRecoilState(isHeaderHiddenState);

  const navigate = useNavigate();

  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.screenY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollTop.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsHidden]);

  const handleClickSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      console.error("Error : ", e);
    }
  };

  // function to open the header mobile
  const toggleMenu = () => {
    setIsHeaderMobileVisible(!isHeaderMobileVisible);
  };

  // function to open the modal to confirm the signout
  const handleClickOpenModal = () => {
    setOpenModal("signOut");
  };

  // function to close the modal to confirm the signout
  const handleClickCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <header
      className={`${isHidden ? "top-[-68px] xl:top-[-70px]" : ""} fixed left-0 top-0 z-40 flex h-[68px] w-full items-center justify-between bg-white px-5 shadow-lg transition-all duration-300 lg:pl-10 xl:h-[70px] xl:justify-between xl:px-24 2xl:px-44`}
    >
      {openModal === "signOut" && (
        <Modal onClick={handleClickCloseModal}>
          <Confirmation
            text="Êtes-vous sûr de vouloir vous déconnecter ?"
            closeModal={handleClickCloseModal}
            confirmModal={handleClickSignOut}
          />
        </Modal>
      )}

      <h2>
        <Link to="/">
          <img
            className="w-[85px] md:w-[90px]"
            src={imageUrl.header.logoHeaderBlack}
            alt="Logo de Ground Elite Academy"
          />
        </Link>
      </h2>

      <div className="hidden xl:flex xl:items-center xl:gap-x-9">
        <Button
          className="bg-[#b0181c] text-white hover:bg-[#7d2a2d]"
          onClick={handleClickOpenModal}
        >
          Se déconnecter
        </Button>
      </div>

      <i
        onClick={toggleMenu}
        className={`fa-solid fa-bars flex w-[42px] cursor-pointer items-center justify-center rounded-full py-1 text-2xl transition-colors hover:bg-slate-100 xl:hidden`}
      ></i>

      <HeaderMobile
        showMenu={isHeaderMobileVisible}
        setShowMenu={setIsHeaderMobileVisible}
        openSignOutModal={handleClickOpenModal}
      />
    </header>
  );
};

export default Header;
