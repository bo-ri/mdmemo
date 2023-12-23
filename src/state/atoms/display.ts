import { atom } from "jotai";

type DisplayState = {
  status: "list" | "form";
}

export const display = atom<DisplayState>({ status: "list" });

/**
 * get display status
 */
export const getDisplayStatus = atom((get) => get(display).status);

/**
 * set display status
 */
export const setDisplayStatus = atom(null, (_, set, update: "list" | "form") => {
  set(display, () => ({ status: update }));
})