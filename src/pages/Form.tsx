import { useState } from "react"
import { useSetAtom } from "jotai";
import { setDisplayStatus } from "../state/atoms/display";
import { setMemoToLocalStorage } from "../libs/templates/utils";

export const Form = () => {
  // const setMemo = useSetAtom(addMemo);
  const setDisplaySettings = useSetAtom(setDisplayStatus);
  const [inputState, setInputState] = useState({
    name: "",
    content: "",
  })
  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setInputState({
      ...inputState,
      name
    });
  }
  const handleOnChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setInputState({
      ...inputState,
      content
    });
  }
  const handleOnClickRegister = async() => {
    try {
      await setMemoToLocalStorage(inputState);
      setDisplaySettings("list");
    } catch (e) {
      return;
    }
  }
  const handleOnClickCancel = () => {
    setDisplaySettings("list");
  }
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="title..."
          onChange={handleOnChangeTitle}
          required
        />
      </div>
      <div>
        <textarea
          rows={5}
          placeholder="markdown here..."
          onChange={handleOnChangeContent}
          required
        ></textarea>
      </div>
      <div>
        <button
          onClick={handleOnClickRegister}
        >register</button>
        <button
          onClick={handleOnClickCancel}
        >cancel</button>
      </div>
    </>
  )
}