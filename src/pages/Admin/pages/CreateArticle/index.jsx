// hook
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
// firebase firestore
import { addDoc, collection } from "firebase/firestore";
import { db } from "src/server/firebase";
// components
import Button from "src/components/Button";
import FormField from "src/components/FormField";
import ExampleMarkdown from "./components/ExampleMarkdown";
// marked
import DOMPurify from "dompurify";
import { marked } from "marked";
// styles
import Modal from "src/components/Modal";
import "./CreateArticle.css";
// atom
import { openModalState } from "src/recoil";
// yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// react hot toast
import toast, { ToastBar, Toaster } from "react-hot-toast";
// import Uploader from "./components/Uploader";

const validationSchema = yup.object({
  articlePath: yup.string().required("Le path est requis"),
  title: yup.string().required("Le titre est requis"),
  content: yup.string().required("Le contenu de l'article est requis"),
  // pictures: yup.string().required("Ajouter quelques photos"),
});

const CreateArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [textMarkdown, setTextMarkdown] = useState("");
  const [isIconInfoHover, setIsIconInfoHover] = useState(false);

  const [openModal, setOpenModal] = useRecoilState(openModalState);

  // function to close the modal
  const handleClickCloseModal = () => {
    setOpenModal(null);
  };

  const defaultValues = {
    articlePath: "",
    title: "",
    content: "",
    // pictures: null,
  };

  const {
    register,
    clearErrors,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

  // convert mardown to html
  const getHtmlFromMarkdown = (markdownText) => {
    const rawHtml = marked.parse(markdownText);
    return DOMPurify.sanitize(rawHtml);
  };

  const submit = async (data) => {
    clearErrors();
    try {
      setIsLoading(true);

      // converti le contenu en html
      const markupHTML = getHtmlFromMarkdown(data.content);

      const articleData = {
        pathArticle: data.articlePath,
        titleArticle: data.title,
        contentArticle: markupHTML,
        dateOfPublication: new Date(),
      };

      const articleRef = await addDoc(collection(db, "articles"), articleData);

      console.log(articleRef.id);

      reset();
      setTextMarkdown("");
      toast.success("Article créé !");
    } catch (e) {
      console.log("Erreur lors de l'envoie de l'article : ", e);
      toast.error("Erreur lors de l'ajout de l'article !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-[68px] flex-1 px-4 pb-8 pt-5 lg:w-[800px] lg:flex-none lg:px-10 xl:mt-0 2xl:w-[950px] 2xl:px-16 2xl:py-12 3xl:w-full 3xl:flex-1">
      <Toaster
        position={window.innerWidth >= 1024 ? "bottom-left" : "top-right"}
        reverseOrder={false}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>
                    <i className="fa-solid fa-xmark mt-0.5 text-xl"></i>
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>

      {openModal === "displayExample" && (
        <Modal onClick={handleClickCloseModal}>
          <ExampleMarkdown />
        </Modal>
      )}

      <h1 className="mb-3 text-2xl font-bold lg:text-4xl">
        Ajouter une Actualité
      </h1>

      <p className="mb-6">
        Créez des articles pour informer vos membres et mettre en avant les
        événements du club (avant d&apos;ajouter un article,{" "}
        <strong>prévenez</strong> Mansour) .
      </p>

      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-y-8 md:gap-y-10 3xl:grid 3xl:grid-cols-2 3xl:grid-rows-[auto_auto_1fr_300px] 3xl:gap-x-10"
      >
        <FormField
          className="3xl:col-span-full"
          errors={errors.articlePath}
          register={register}
          id="articlePath"
          label="Chemin d'accès"
          type="text"
          placeholder="Le path doit être assez descriptif. Ex : /victoire-de-gaetan-au-cfjjb"
        />

        <FormField
          className="3xl:col-span-full"
          errors={errors.title}
          register={register}
          id="title"
          label="Titre de l'article"
          type="text"
          placeholder="Un titre très descriptif de l'article"
        />

        {/* editor */}
        <div className="relative flex flex-col">
          <div className="mb-1 flex items-center gap-x-2 pl-1 lg:mb-2">
            <label htmlFor="textarea" className="font-bold">
              Contenu
            </label>

            <span
              onMouseEnter={() => setIsIconInfoHover(true)}
              onMouseLeave={() => setIsIconInfoHover(false)}
              className="relative mt-0.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-black"
            >
              <i className="fa-solid fa-info text-[9px] text-white"></i>
              {isIconInfoHover && (
                <div>
                  <div className="absolute -right-24 bottom-8 w-48 rounded-lg bg-white p-2 shadow-md">
                    Voici un guide d&apos;écriture du markdown (
                    <button
                      onClick={() => setOpenModal("displayExample")}
                      className="underline hover:no-underline"
                    >
                      exemple
                    </button>
                    )
                  </div>
                  <svg
                    className="absolute -right-1.5 bottom-4 rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    height="28px"
                    viewBox="0 -960 960 960"
                    width="28px"
                    fill="#fff"
                  >
                    <path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z" />
                  </svg>
                </div>
              )}
            </span>
          </div>

          <textarea
            {...register("content")}
            value={textMarkdown}
            onChange={(e) => setTextMarkdown(e.target.value)}
            id="textarea"
            className="h-32 w-full rounded-xl border border-slate-500 bg-transparent px-3 py-2 focus:outline-[#b0181c] md:h-64 2xl:h-96"
          ></textarea>

          {errors.content && (
            <p className="absolute -bottom-6 left-1 text-sm text-red-600 md:-bottom-7 md:text-base 3xl:-bottom-[30px]">
              {" "}
              <i className="fa-solid fa-triangle-exclamation mr-1"></i>{" "}
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Preview */}
        <div>
          <label className="mb-1 block font-bold lg:mb-2">
            Prévisualisation
          </label>

          <div
            className="preview-wrapper min-h-36 rounded-xl border border-slate-500 px-3 py-2 md:min-h-64 3xl:min-h-96"
            dangerouslySetInnerHTML={{
              __html: getHtmlFromMarkdown(textMarkdown),
            }}
          ></div>
        </div>

        <div className="mt-4 3xl:col-span-full 3xl:justify-self-center">
          <Button className="w-full bg-[#b0181c] text-white 3xl:w-52">
            {isLoading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Envoyer"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
