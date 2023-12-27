import { atom } from "jotai";

export type MemoState = {
  name: string;
  content: string;
  onClick?: (arg?: any) => Promise<void>;
};

export const memo = atom<Array<MemoState>>([]);

/**
 * read memo state
 */
export const getMemo = atom((get) => get(memo));

/**
 * add new memo
 */
export const addMemo = atom(
  null,
  (get, set, update: MemoState) => {
    const currentMemo = get(memo);
    currentMemo.push(update);
    set(memo, currentMemo);
  }
);

export const updateMemo = atom(
  null,
  (_, set, update: MemoState[]) => {
    set(memo, update);
  }
)

/**
 * delete memo
 */
export const deleteMemo = atom(
  null,
  (get, set, update: number) => {
    const currentMemo = get(memo);
    currentMemo.splice(update, 1);
    set(memo, currentMemo);
  }
);