import { useAtom, useSetAtom } from "jotai";
import { memo, updateMemo } from "../state/atoms/memo";
import { useState } from "react";
import { display } from "../state/atoms/display";
import { updateMemoToLocalStorage } from "../libs/templates/utils";

export const Update = ({
  index
}: {
  index: number;
}) => {
  const [memoList] = useAtom(memo);
  const updateMemos = useSetAtom(updateMemo)
  const [formData, setFormData] = useState(memoList[index - 1]);
  const setDisplaySettings = useSetAtom(display);

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      name: e.target.value
    })
  }

  const handleOnChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      content: e.target.value
    });
  }

  const handleOnClickUpdate = async () => {
    const targetMemoList = memoList;
    targetMemoList[index - 1] = {
      ...formData,
      onClick: async() => {
        await navigator.clipboard.writeText(formData.content);
      }
    }
    try {
      // localStorageへ保存
      await updateMemoToLocalStorage(targetMemoList);
      // stateの更新
      await updateMemos(targetMemoList);
      setDisplaySettings({
        status: "list",
        selectedIndex: undefined
      })
    } catch (_) {
      return;
    }
  }

  const handleOnClickDelete = async () => {
    const targetMemoList = memoList.filter((_, i) => i != index - 1);
    try {
      // localStorageへ保存
      await updateMemoToLocalStorage(targetMemoList);
      // stateの保存
      await updateMemos(targetMemoList);
      setDisplaySettings({
        status: "list",
        selectedIndex: undefined
      });
    } catch (_) {
      return;
    }
  }

  const handleOnClickCancel = () => {
    setDisplaySettings({
      status: "list",
      selectedIndex: undefined
    });
  }

  return(
    <>
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={handleOnChangeName}
          required
        />
      </div>
      <div>
        <textarea
          rows={5}
          value={formData.content}
          onChange={handleOnChangeContent}
          required
        ></textarea>
      </div>
      <div>
        <button onClick={handleOnClickUpdate}>update</button>
        <button onClick={handleOnClickDelete}>delete</button>
        <button onClick={handleOnClickCancel}>cancel</button>
      </div>
    </>
  );
}