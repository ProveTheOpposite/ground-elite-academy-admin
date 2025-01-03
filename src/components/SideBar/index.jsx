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
      "M520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560q-17 0-28.5-11.5T520-640ZM120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160q-17 0-28.5-11.5T120-480Zm400 320v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560q-17 0-28.5-11.5T520-160Zm-400 0v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160q-17 0-28.5-11.5T120-160Zm80-360h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z",
    iconPathDActive:
      "M560-600q-17 0-28.5-11.5T520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560ZM160-440q-17 0-28.5-11.5T120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160Zm400 320q-17 0-28.5-11.5T520-160v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560Zm-400 0q-17 0-28.5-11.5T120-160v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160Z",
    id: 0,
  },
  {
    text: "Ajout des cours",
    path: "/admin/courses/add-course",
    iconPathD:
      "M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z",
    iconPathDActive:
      "M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z",
    id: 1,
  },
  {
    text: "Vue d'ensemble",
    path: "/admin/courses/overview",
    iconPathD:
      "M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H200Zm0-80h560v-160H200v160Zm0 480q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h560q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H200Zm0-80h560v-160H200v160Zm0-560v160-160Zm0 400v160-160Z",
    iconPathDActive:
      "M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H200Zm0 400q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h560q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H200Z",
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

          <ul className="flex flex-col gap-y-4 pr-10 text-xl">
            {links.map((link) => (
              <li
                key={link.id}
                className={`rounded-e-3xl py-1.5 pl-7 transition-colors hover:text-[#b0181c] xl:cursor-pointer ${location.pathname === link.path ? "bg-[#b0181c]" : ""}`}
              >
                <NavLink className="flex items-center" to={link.path}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    width="24px"
                    viewBox="0 -960 960 960"
                    fill={location.pathname === link.path ? "#fff" : "#c6c6c6"}
                    className="xl:mr-3"
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
