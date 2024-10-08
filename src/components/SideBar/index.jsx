// hook
import { useRecoilValue } from "recoil";
// react router dom
import { Link } from "react-router-dom";
// atom
import { isHeaderHiddenState } from "src/recoil";

const SideBar = () => {
  const isHeaderHidden = useRecoilValue(isHeaderHiddenState);

  return (
    <div className="hidden xl:block xl:w-[250px]">
      <nav
        style={{
          height: `${isHeaderHidden ? "100vh" : `calc(100vh - ${window.screenX < 1280 ? "68px" : "70px"})`}`,
        }}
        className={`${isHeaderHidden ? "top-0" : "top-[68px] xl:top-[70px]"} fixed left-0 z-40 w-[250px] bg-zinc-50 p-6 transition-all duration-300`}
      >
        <ul className="xl:flex xl:flex-col xl:gap-y-3 xl:text-lg">
          <li className="transition-colors hover:text-[#b0181c] xl:cursor-pointer">
            <Link to="/">
              <i className="fa-solid fa-home xl:mr-5 xl:w-[15px]"></i>
              Tableau de bord
            </Link>
          </li>

          <li className="transition-colors hover:text-[#b0181c] xl:cursor-pointer">
            <Link to="/admin/courses/add-course">
              <i className="fa-solid fa-calendar-days xl:mr-5 xl:w-[15px]"></i>
              Ajout des cours
            </Link>
          </li>

          <li className="transition-colors hover:text-[#b0181c] xl:cursor-pointer">
            <Link to="/admin/courses/overview">
              <i className="fa-solid fa-eye xl:mr-5 xl:w-[15px]"></i>
              Vue d&apos;ensemble
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
