import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mt-[68px] flex-1 px-5 py-7 xl:mt-[70px]">
      <h1 className="mb-5 text-3xl font-bold lg:mb-8 xl:text-4xl">
        Bienvenue sur le{" "}
        <span className="text-[#b0181c]">panel d&apos;administration</span>.
      </h1>

      <p>
        Des fonctionnalitées future apparaîtront...
        <br />
        Pour l&apos;instant, ajoutez des cours{" "}
        <Link
          className="text-sky-500 underline hover:no-underline"
          to="/admin/courses/add-course"
        >
          ici
        </Link>
        .
        <br />
        Pour voir tous les cours, dirigez-vous{" "}
        <Link
          className="text-sky-500 underline hover:no-underline"
          to="/admin/courses/overview"
        >
          ici
        </Link>
      </p>
    </div>
  );
};

export default Home;
