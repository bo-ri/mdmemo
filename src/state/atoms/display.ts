import { atom } from "jotai";

type DisplayState = {
  status: "list" | "form" | "update";
  selectedIndex?: number;
}

export const display = atom<DisplayState>({ status: "list", selectedIndex: undefined });

/**
 * get display status
 */
export const getDisplayStatus = atom((get) => get(display).status);

/**
 * set display status
 */
export const setDisplayStatus = atom(null, (_, set, update: "list" | "form" | "update") => {
  set(display, () => ({ status: update }));
})