import { MemoState } from "../../state/atoms/memo";

/**
 * get memos from Local Storage
 * 
 * @returns 
 */
const getMemoFromStorage = async(): Promise<Array<{name: string; content: string;}>> => {
  try {
    const data = await chrome.storage.local.get(["mdmemo"]);
    if (Array.isArray(data.mdmemo)) {
      return data.mdmemo;
    }
    return [];
  } catch (e) {
    return [];
  }
}

export const wrapperGetMemo = async () => {
  try {
    const data = await getMemoFromStorage();
    return data.map((item: {name: string; content: string}) => {
      return {
        name: item.name,
        content: item.content,
        onClick: async () => {
          await navigator.clipboard.writeText(item.content);
          setTimeout(() => {
            window.close();
          }, 100);
        }
      };
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * set new memo in Local Storage
 * 
 * @param memo 
 */
export const setMemoToLocalStorage = async(input: {name: string; content: string}) => {
  try {
    const currentMemos = await getMemoFromStorage();
    currentMemos.push(input);
    await chrome.storage.local.set({ mdmemo: currentMemos });
  } catch (e) {
    console.error(e);
  }
}

export const updateMemoToLocalStorage = async(target: MemoState[]) => {
  try {
    await chrome.storage.local.set({ mdmemo: target });
  } catch (e) {
    console.error(e);
  }
}

export const deleteMemoFromStorage = async(index: number) => {
  try {
    const currentMemos = await getMemoFromStorage();
    currentMemos.splice(index, 1);
    await chrome.storage.local.set({ mdmemo: currentMemos });
  } catch (e) {
    console.error(e);
  }
}