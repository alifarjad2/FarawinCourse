import { useReducer } from "react";
import { create } from "zustand";

export const useStore = create((set) => ({
  bears: 0,

  theme: {},
  setTheme: (theme) => set((state) => ({ theme: { ...theme } })),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default function basketReducer(state, action) {
  console.log(state, action);
  const { type, item } = action;
  if (type == "addItem") {
    return [...state, item];
  }

  if (type == "delete") {
    return state.filter((i) => i.name !== item.name);
  }
}
