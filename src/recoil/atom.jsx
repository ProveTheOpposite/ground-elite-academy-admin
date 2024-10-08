import { atom } from "recoil";

// atom définissant si le user est login ou pas
export const isAdminState = atom({
  key: "isAdminState",
  default: false,
});

// atom stockant les cours du planning
export const eventsScheduleState = atom({
  key: "eventsScheduleState",
  default: [],
});

// atom cachant le header au moment du scoll
export const isHeaderHiddenState = atom({
  key: "isHeaderHiddenState",
  default: false,
});

// atom cachant le header au moment du scoll
export const openModalState = atom({
  key: "openModalState",
  default: null,
});
