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

const schema = yup.object({
  title: yup.string().required("Le titre est obligatoire"),
  dateOfEvent: yup.string().required("Le date est obligatoire"),
  hoursStart: yup.string().required("L'heure de début est obligatoire"),
  hoursEnd: yup.string().required("L'heure de fin est obligatoire"),
  typeEvent: yup.string().required("Le type d'évènement est obligatoire"),
});

const CoursesForm = () => {
  const { courseId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const setEventsSchedule = useSetRecoilState(eventsScheduleState);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      dateOfEvent: new Date(),
      hoursStart: "",
      hoursEnd: "",
      typeEvent: "",
    },
    resolver: yupResolver(schema),
  });

  // function to add a course on db
  const onSubmit = async (data) => {
    const { title, dateOfEvent, hoursStart, hoursEnd, typeEvent } = data;
    const courseData = {
      title,
      start: `${dateOfEvent}T${hoursStart}:00`,
      end: `${dateOfEvent}T${hoursEnd}:00`,
      typeEvent,
    };

    try {
      setIsLoading(true);
      const courseRef = courseId
        ? doc(db, "courses", courseId)
        : doc(collection(db, "courses"));

      await setDoc(courseRef, courseData, { merge: true });

      const newCourse = { ...courseData, id: courseRef.id };
      setEventsSchedule((prevEvents) => {
        // verify if the event already exists
        const eventIndex = prevEvents.findIndex(
          (event) => event.id === courseRef.id,
        );

        if (eventIndex !== -1) {
          // replace the existing event
          const updatedEvents = [...prevEvents];
          updatedEvents[eventIndex] = newCourse;
          return updatedEvents;
        } else {
          // add the new event
          return [...prevEvents, newCourse];
        }
      });

      reset();
      toast.success(`${courseId ? "Modification" : "Ajout"} réussi !`);
    } catch (error) {
      toast.error(
        `Erreur lors de ${courseId ? "la sauvegarde" : "l'ajout"} du cours !`,
      );
      console.log("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to get events from db (for edit)
  useEffect(() => {
    if (!courseId) return;

    const fetchEvent = async () => {
      try {
        const eventRef = doc(db, "courses", courseId);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
          const eventData = eventSnap.data();
          reset({
            title: eventData.title,
            dateOfEvent: eventData.start?.slice(0, 10) || "",
            hoursStart: eventData.start?.slice(11, 16) || "",
            hoursEnd: eventData.end?.slice(11, 16) || "",
            typeEvent: eventData.typeEvent,
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchEvent();
  }, [courseId, reset]);

  return (
    <div className="mt-[68px] flex-1 px-5 py-7 lg:w-[800px] lg:flex-none lg:px-16 lg:pt-10 xl:mt-[70px] 2xl:w-[950px]">
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
          : "Ici, vous pouvez ajouter les cours que vous souhaitez mais également des évènements autre que le sport : Noël, gouter, etc..."}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
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
          type="text"
          placeholder="Ex : 09:00. Respectez bien les ' : '"
          errors={errors.hoursStart}
        />

        <FormField
          className="w-full"
          id="hoursEnd"
          label="L'heure de la fin du cours :"
          register={register}
          type="text"
          placeholder="Ex : 11:30. Respectez bien les ' : '"
          errors={errors.hoursEnd}
        />

        <FormField
          className="w-full"
          id="typeEvent"
          label="Type d'évènement :"
          register={register}
          type="text"
          placeholder="Lutte, Grappling ou Autre"
          errors={errors.hoursEnd}
        />

        <div className="w-full">
          <Button className="w-full bg-[#b0181c] text-white md:py-3">
            {isLoading ? (
              <i className="fa-solid fa-spinner animate-spin text-xl"></i>
            ) : (
              "Soumettre"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CoursesForm;
