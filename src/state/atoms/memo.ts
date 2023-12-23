import { atom } from "jotai";

type MemoState = {
  name: string;
  contents: string;
}[];

export const memo = atom<Array<MemoState>>([]);

/**
 * read memo state
 */
export const getMemo = atom((get) => get(memo));

/**
 * add new memo
 */
export const addMemo = atom(null, (get, set, update: MemoState) => {
  const currentMemo = get(memo);
  currentMemo.push(update);
  set(memo, () => currentMemo);
});

/**
 * delete memo
 */
export const deleteMemo = atom(null, (get, set, update: number) => {
  const currentMemo = get(memo);
  currentMemo.splice(update, 1);
  set(memo, () => currentMemo);
});