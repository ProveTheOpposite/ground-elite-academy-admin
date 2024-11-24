// hooks
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// react router dom

// atom
import { eventsScheduleState, openModalState } from "src/recoil";

// hot toast
import toast, { ToastBar, Toaster } from "react-hot-toast";

// firebase
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "src/server/firebase";

// components
import { useRef } from "react";
import Confirmation from "src/components/Confirmation";
import Modal from "src/components/Modal";
import Event from "./components/Event";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";

const OverviewCourses = () => {
  const [selectedCourses, setSelectedCourses] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [searchBarFilter, setSearchBarFilter] = useState("");
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  const filterClickedRef = useRef(null);

  const [eventsSchedule, setEventsSchedule] =
    useRecoilState(eventsScheduleState);

  const [openModal, setOpenModal] = useRecoilState(openModalState);

  const handleClickFilter = () => {
    setIsFilterClicked(true);
  };

  const handleClickOutsideFilter = (e) => {
    if (
      filterClickedRef.current &&
      !filterClickedRef.current.contains(e.target)
    ) {
      setIsFilterClicked(false);
    }
  };

  // Handle the select all checkbox
  const handleSelectAll = () => {
    const newSelection = Object.keys(selectedCourses).reduce((acc, key) => {
      acc[key] = !selectAll;
      return acc;
    }, {});
    setSelectAll(!selectAll);
    setSelectedCourses(newSelection);
  };

  const handleDeleteCourses = async () => {
    const selectedIds = Object.keys(selectedCourses).filter(
      (id) => selectedCourses[id],
    );

    try {
      await Promise.all(
        selectedIds.map((id) => deleteDoc(doc(db, "courses", id))),
      );

      // update state after delation
      setEventsSchedule((prevEvents) =>
        prevEvents.filter((event) => !selectedIds.includes(event.id)),
      );

      toast.success("Suppression réussi !");
      setSelectedCourses({});
      setSelectAll(false);
      setOpenModal(null);
    } catch (error) {
      toast.error("Suppression échoué !");
      console.error("Erreur lors de la suppression des cours :", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideFilter);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideFilter);
    };
  }, []);

  // Effect to get events from db
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsSnapshot = await getDocs(collection(db, "courses"));
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEventsSchedule(eventsData);

      // Initialize the selectedCourses state
      const initialSelection = eventsData.reduce((acc, event) => {
        acc[event.id] = false;
        return acc;
      }, {});
      setSelectedCourses(initialSelection);
    };

    fetchEvents();
  }, [setEventsSchedule]);

  return (
    <div className="mt-[68px] flex-1 px-4 pb-16 pt-8 xl:mt-0 2xl:px-8">
      <Toaster
        position={window.innerWidth >= 1024 ? "bottom-right" : "top-right"}
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

      <SearchBar setSearchBarFilter={setSearchBarFilter} />

      <div className="mt-5">
        <div className="relative flex justify-end pb-3 pr-5">
          <span onClick={handleClickFilter} className="h-[28px] w-[28px]">
            <i
              className={`fa-solid fa-sliders ${
                Object.values(selectedCourses).some((isSelected) => isSelected)
                  ? "hidden"
                  : "block"
              } cursor-pointer text-xl text-gray-600`}
            ></i>
          </span>

          {isFilterClicked && <Filter filterClickedRef={filterClickedRef} />}
        </div>

        <div className="relative rounded-md bg-white shadow-lg">
          <header className="flex items-center justify-between gap-x-5 border-b border-gray-400 px-4 py-3 md:relative">
            <div className="md:ml-1 md:flex-auto">
              <input
                className="scale-110 cursor-pointer"
                type="checkbox"
                checked={
                  selectAll ||
                  Object.values(selectedCourses).some(
                    (isSelected) => isSelected,
                  )
                }
                onChange={handleSelectAll}
              />
            </div>

            {/* <SearchBar setSearchBarFilter={setSearchBarFilter} /> */}

            <span className="hidden md:block md:min-w-[84px] md:flex-1 md:font-semibold">
              Évènement
            </span>

            <span className="hidden md:block md:min-w-[102px] md:flex-1 md:font-semibold">
              Date de début
            </span>

            <span className="hidden md:block md:min-w-[102px] md:flex-1 md:font-semibold">
              Date de fin
            </span>
          </header>

          <div>
            <div
              className={`absolute left-0 ${
                Object.values(selectedCourses).some((isSelected) => isSelected)
                  ? "-top-12 z-0"
                  : "top-0 -z-10"
              } flex w-full items-center justify-between rounded-se-md rounded-ss-md bg-[#d9edfd] px-4 py-2 transition-all duration-300`}
            >
              <div>
                <span
                  onClick={() => {
                    const resetSelection = Object.keys(selectedCourses).reduce(
                      (acc, key) => {
                        acc[key] = false;
                        return acc;
                      },
                      {},
                    );
                    setSelectedCourses(resetSelection);
                    setSelectAll(false);
                  }}
                  className="mr-3 text-gray-600"
                >
                  <i className="fa-solid fa-xmark cursor-pointer"></i>
                </span>

                <span>
                  {
                    Object.keys(selectedCourses).filter(
                      (key) => selectedCourses[key],
                    ).length
                  }{" "}
                  sélectionnés
                </span>
              </div>

              <button
                onClick={() => setOpenModal("deleteCourses")}
                className="rounded-md px-2 py-1 text-[#b0181c] outline-none transition-colors duration-300 hover:bg-[#d32f2f1f]"
              >
                <i className="fa-solid fa-trash-can mr-3 text-[#b0181c]"></i>
                Supprimer
              </button>
            </div>

            {eventsSchedule.length > 0 ? (
              eventsSchedule
                .filter(({ title }) =>
                  title.toLowerCase().startsWith(searchBarFilter),
                )
                .map(({ id, title, start, end, typeEvent }) => (
                  <Event
                    key={id}
                    id={id}
                    t={title}
                    s={start}
                    e={end}
                    typeEvent={typeEvent}
                    selectedCourses={selectedCourses}
                    setSelectedCourses={setSelectedCourses}
                  />
                ))
            ) : (
              <p className="p-3 text-center lg:p-5">
                Il n&apos;y a actuellement aucun cours ou événement planifié.
              </p>
            )}
          </div>
        </div>
      </div>

      {openModal === "deleteCourses" && (
        <Modal onClick={() => setOpenModal(null)}>
          <Confirmation
            text="Êtes-vous sûr de vouloir supprimer le(s) cours/évènement ?"
            closeModal={() => setOpenModal(null)}
            confirmModal={handleDeleteCourses}
          />
        </Modal>
      )}
    </div>
  );
};

export default OverviewCourses;
