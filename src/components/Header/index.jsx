// React & Hooks
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

// atom
import { isHeaderHiddenState, openModalState } from "src/recoil";

// Components
import Confirmation from "../Confirmation";
import Modal from "../Modal";
import SubHeader from "./SubHeader";

// Assets & Translations
import { imageUrl } from "src/assets/images/imagesList";

// utils
import { handleClickSignOut } from "src/utils";

const HeaderMobile = () => {
  const [isHeaderMobileVisible, setIsHeaderMobileVisible] = useState(false);

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const [isHidden, setIsHidden] = useRecoilState(isHeaderHiddenState);

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
      className={`${isHidden ? "top-[-68px] xl:top-[-70px]" : ""} fixed left-0 top-0 z-40 flex h-[68px] w-full items-center justify-between bg-white px-5 shadow-lg transition-all duration-300 lg:pl-10 xl:hidden`}
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

      <i
        onClick={toggleMenu}
        className={`fa-solid fa-bars flex w-[42px] cursor-pointer items-center justify-center rounded-full py-1 text-2xl transition-colors hover:bg-slate-100 xl:hidden`}
      ></i>

      <SubHeader
        showMenu={isHeaderMobileVisible}
        setShowMenu={setIsHeaderMobileVisible}
        openSignOutModal={handleClickOpenModal}
      />
    </header>
  );
};

export default HeaderMobile;
