// hooks
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

// atom
import { eventsScheduleState, openModalState } from "src/recoil";

// hot toast
import toast, { ToastBar, Toaster } from "react-hot-toast";

// firebase
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "src/server/firebase";

// components
import Confirmation from "src/components/Confirmation";
import Modal from "src/components/Modal";
import Event from "./components/Event";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";

const OverviewCourses = () => {
  const [selectedCourses, setSelectedCourses] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const [searchBarFilter, setSearchBarFilter] = useState("");

  const [elemRef, setElemRef] = useState("");

  const [filteredEvents, setFilteredEvents] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filterClickedRef = useRef(null);
  const subMenuItemsPerPageClickedRef = useRef(null);

  const [eventsSchedule, setEventsSchedule] =
    useRecoilState(eventsScheduleState);

  const [openModal, setOpenModal] = useRecoilState(openModalState);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = eventsSchedule.slice(indexOfFirstItem, indexOfLastItem);

  // update filteredEvents with elems paginated
  const handlePaginate = useCallback((items) => {
    setFilteredEvents(items);
  }, []);

  // hide the elems needed refs
  const handleClickOutsideElemRefs = (e, refs, activeElemRef) => {
    if (!activeElemRef) return;

    const activeRef = refs[activeElemRef];

    if (activeRef?.current && !activeRef.current.contains(e.target)) {
      setElemRef("");
    }
  };

  // effect to remove the elems needed refs
  useEffect(() => {
    const handleClick = (e) =>
      handleClickOutsideElemRefs(
        e,
        {
          filter: filterClickedRef,
          subMenuItemsPerPage: subMenuItemsPerPageClickedRef,
        },
        elemRef,
      );

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [elemRef]);

  // Handle the select all checkbox
  const handleSelectAll = () => {
    const allSelected = Object.values(selectedCourses).every(
      (isSelected) => isSelected,
    );

    const newSelection = eventsSchedule.reduce((acc, event) => {
      acc[event.id] = !allSelected;
      return acc;
    }, {});

    setSelectedCourses(newSelection);
    setSelectAll(!allSelected);
  };

  // update selectAll if all the elements visibles are selected
  useEffect(() => {
    const currentPageSelected = currentItems.every(
      (item) => selectedCourses[item.id],
    );

    setSelectAll(currentPageSelected);
  }, [currentItems, selectedCourses]);

  // delete courses
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

  // Effect to get events from db
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsSnapshot = await getDocs(collection(db, "courses"));
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEventsSchedule(eventsData);

      // Force un premier affichage des événements paginés
      if (eventsData.length > 0) {
        setFilteredEvents(eventsData.slice(0, 10)); // Assure que les premiers éléments sont visibles
      }

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
    <div className="mt-[68px] flex-1 px-4 pb-20 pt-8 xl:mt-0 2xl:px-8">
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

      <div className="mt-5 rounded-xl border border-gray-300 bg-zinc-50 p-4 shadow-md md:pb-5">
        <div className="relative flex justify-end pb-3 pr-5">
          <span
            onClick={() => setElemRef("filter")}
            className="h-[28px] w-[28px]"
          >
            <i
              className={`fa-solid fa-sliders ${
                Object.values(selectedCourses).some((isSelected) => isSelected)
                  ? "hidden"
                  : "block"
              } cursor-pointer text-xl text-gray-600`}
            ></i>
          </span>

          {elemRef === "filter" && (
            <Filter filterClickedRef={filterClickedRef} />
          )}
        </div>

        <div className="relative bg-zinc-50">
          <header
            className={`flex items-center justify-between gap-x-1 ${Object.values(selectedCourses).some((isSelected) => isSelected) ? "rounded-es-none rounded-se-none" : eventsSchedule.length === 0 ? "rounded-xl" : "rounded-se-xl rounded-ss-xl"} border-2 border-gray-300 px-4 py-3 md:relative`}
          >
            <div className="md:ml-1 md:flex-auto">
              <input
                className="scale-110 cursor-pointer outline-none"
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
              } flex w-full items-center justify-between rounded-se-xl rounded-ss-xl bg-[#d9edfd] px-4 py-2 transition-all duration-300`}
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
                  <i className="fa-solid fa-xmark cursor-pointer lg:text-lg"></i>
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

            {filteredEvents.length > 0 ? (
              filteredEvents
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
              <p className="py-8 text-center lg:p-12">
                Il n&apos;y a actuellement aucun cours ou événement planifié.
              </p>
            )}
          </div>

          {eventsSchedule.length > 0 && (
            <Pagination
              onPaginate={handlePaginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              currentItems={currentItems}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              elemRef={elemRef}
              subMenuItemsPerPageClickedRef={subMenuItemsPerPageClickedRef}
            />
          )}
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
