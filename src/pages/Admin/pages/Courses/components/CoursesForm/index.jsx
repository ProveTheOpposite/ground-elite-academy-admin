// hook
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// firebase
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "src/server/firebase";

// hot toast
import toast, { ToastBar, Toaster } from "react-hot-toast";

// atom
import { eventsScheduleState } from "src/recoil";

// yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// component
import Button from "src/components/Button";
import FormField from "src/components/FormField";

const eventTypeStyles = {
  Lutte: {
    active: "bg-blue-500 text-white",
    inactive: "border-blue-500 text-blue-500",
  },
  Grappling: {
    active: "bg-[#b0181c] text-white",
    inactive: "border-[#b0181c] text-[#b0181c]",
  },
  Autre: {
    active: "bg-yellow-600 text-white",
    inactive: "border-yellow-600 text-yellow-600",
  },
};

const validationSchema = yup.object({
  title: yup.string().required("Le titre est requis"),
  dateOfEvent: yup.string().required("La date est requise"),
  hoursStart: yup.string().required("L'heure de début est requise"),
  hoursEnd: yup.string().required("L'heure de fin est requise"),
  typeEvent: yup.string().required("Le type d'évènement est requis"),
});

const CoursesForm = () => {
  const { courseId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTypeEvent, setSelectedTypeEvent] = useState("");

  const setEventsSchedule = useSetRecoilState(eventsScheduleState);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      dateOfEvent: new Date().toISOString().slice(0, 10),
      hoursStart: "",
      hoursEnd: "",
      typeEvent: "",
    },
    resolver: yupResolver(validationSchema),
  });

  // Fetch event details when editing
  useEffect(() => {
    if (!courseId) return;

    const fetchEventDetails = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "courses", courseId));
        if (eventDoc.exists()) {
          const { title, start, end, typeEvent } = eventDoc.data();
          reset({
            title,
            dateOfEvent: start.slice(0, 10),
            hoursStart: start.slice(11, 16),
            hoursEnd: end.slice(11, 16),
            typeEvent,
          });
          setSelectedTypeEvent(typeEvent);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchEventDetails();
  }, [courseId, reset]);

  const handleFormSubmit = async (formData) => {
    const { title, dateOfEvent, hoursStart, hoursEnd } = formData;

    const courseData = {
      title,
      start: `${dateOfEvent}T${hoursStart}:00`,
      end: `${dateOfEvent}T${hoursEnd}:00`,
      typeEvent: selectedTypeEvent,
    };

    try {
      setIsLoading(true);
      const courseRef = courseId
        ? doc(db, "courses", courseId)
        : doc(collection(db, "courses"));
      await setDoc(courseRef, courseData, { merge: true });

      setEventsSchedule((prevEvents) => {
        const updatedEvent = { ...courseData, id: courseRef.id };
        const existingEventIndex = prevEvents.findIndex(
          (event) => event.id === courseRef.id,
        );

        if (existingEventIndex !== -1) {
          return prevEvents.map((event, index) =>
            index === existingEventIndex ? updatedEvent : event,
          );
        } else {
          return [...prevEvents, updatedEvent];
        }
      });

      reset();
      toast.success(`${courseId ? "Modification" : "Ajout"} réussi !`);
    } catch (error) {
      console.error(
        `Erreur lors de ${courseId ? "la sauvegarde" : "l'ajout"} du cours !`,
      );
      toast.error(
        `Erreur lors de ${courseId ? "la sauvegarde" : "l'ajout"} du cours !`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-[68px] flex-1 px-5 py-7 lg:w-[800px] lg:flex-none lg:px-10 xl:mt-0 2xl:w-[950px] 2xl:px-16 2xl:py-12">
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

      <h2 className="mb-3 text-2xl font-bold lg:text-4xl">
        {courseId
          ? "Modification des cours :"
          : "Création de cours pour le planning :"}
      </h2>

      <p className="mb-6">
        {courseId
          ? "Vous pouvez modifier un cours si vous avez fait une gaffe ou si vous souhaitez simplement faire un changement sur des cours existants."
          : "Ici, vous pouvez ajouter les cours que vous souhaitez mais également des évènements autre que le sport : Noël, goûter, etc..."}
      </p>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col items-center gap-y-10 lg:gap-y-12"
      >
        <FormField
          className="w-full"
          id="title"
          label="Nom du cours :"
          register={register}
          type="text"
          placeholder="Ex : Grappling (enfant)"
          errors={errors.title}
        />

        <FormField
          className="w-full"
          id="dateOfEvent"
          label="Date du cours :"
          register={register}
          type="date"
          errors={errors.dateOfEvent}
        />

        <FormField
          className="w-full"
          id="hoursStart"
          label="L'heure du début du cours :"
          register={register}
          type="time"
          errors={errors.hoursStart}
        />

        <FormField
          className="w-full"
          id="hoursEnd"
          label="L'heure de la fin du cours :"
          register={register}
          type="time"
          errors={errors.hoursEnd}
        />

        <div className="flex w-full flex-col">
          <label className="mb-3 ml-1 font-bold lg:mb-2" htmlFor="typeEvent">
            Type d&apos;évènement :
          </label>

          <div className="flex gap-x-6">
            {["Lutte", "Grappling", "Autre"].map((type) => {
              const isActive = watch("typeEvent") === type;
              const style =
                eventTypeStyles[type][isActive ? "active" : "inactive"];
              return (
                <label
                  key={type}
                  onClick={() => setSelectedTypeEvent(type)}
                  className={`cursor-pointer rounded-full border px-4 py-0.5 font-semibold transition-opacity hover:opacity-85 ${style}`}
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("typeEvent")}
                    className="hidden"
                  />
                  {type}
                </label>
              );
            })}
          </div>

          {errors.typeEvent && (
            <p className="mt-2 text-sm text-red-600 md:-bottom-7 md:text-base">
              <i className="fa-solid fa-triangle-exclamation mr-1"></i>{" "}
              {errors.typeEvent.message}
            </p>
          )}
        </div>

        <Button className="w-full bg-[#b0181c] text-white md:py-3">
          {isLoading ? (
            <i className="fa-solid fa-spinner animate-spin text-xl"></i>
          ) : (
            "Soumettre"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CoursesForm;
