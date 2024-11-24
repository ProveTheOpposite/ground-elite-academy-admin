// hook
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
// react router dom
import { Link, NavLink } from "react-router-dom";
// components
import Button from "../Button";
import Confirmation from "../Confirmation";
import Modal from "../Modal";
// atom
import { openModalState } from "src/recoil";
// assets
import { imageUrl } from "src/assets/images/imagesList";
// utils
import { handleClickSignOut } from "src/utils";

const links = [
  {
    text: "Tableau de bord",
    path: "/",
    iconPathD:
      "M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z",
    id: 0,
  },
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

const SideBar = () => {
  const location = useLocation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);

  // function to open the modal to confirm the signout
  const handleClickOpenModal = () => {
    setOpenModal("signOut");
  };

  // function to close the modal to confirm the signout
  const handleClickCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="hidden xl:block xl:w-[280px] 2xl:w-[300px]">
      {openModal === "signOut" && (
        <Modal onClick={handleClickCloseModal}>
          <Confirmation
            text="Êtes-vous sûr de vouloir vous déconnecter ?"
            closeModal={handleClickCloseModal}
            confirmModal={handleClickSignOut}
          />
        </Modal>
      )}

      <nav
        className={`fixed left-0 top-0 flex h-full w-[280px] flex-col justify-between border-r border-slate-400 bg-zinc-50 py-6 transition-all duration-300 2xl:w-[300px]`}
      >
        <div>
          <Link className="mb-7 flex pl-7" to="/">
            <img
              className="w-[110px]"
              src={imageUrl.header.logoHeaderBlack}
              alt="Logo"
            />
          </Link>

          <ul className="flex flex-col gap-y-5 pl-7 text-xl">
            {links.map((link) => (
              <li
                key={link.id}
                className="transition-colors hover:text-[#b0181c] xl:cursor-pointer"
              >
                <NavLink className="flex items-center" to={link.path}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill={
                      location.pathname === link.path ? "#b0181c" : "#c6c6c6"
                    }
                    className="xl:mr-3"
                  >
                    <path d={link.iconPathD} />
                  </svg>

                  <span>{link.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10 px-7">
          <Button
            className="w-full bg-[#b0181c] !py-3 text-white"
            onClick={handleClickOpenModal}
          >
            <i className="fa-solid fa-arrow-right-from-bracket mr-3"></i>
            Se déconnecter
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
