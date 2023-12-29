import { useState } from "react"
import { useSetAtom } from "jotai";
import { setDisplayStatus } from "../state/atoms/display";
import { setMemoToLocalStorage } from "../libs/templates/utils";
import { addMemo } from "../state/atoms/memo";

export const Form = () => {
  const setMemo = useSetAtom(addMemo);
  const setDisplaySettings = useSetAtom(setDisplayStatus);
  const [inputState, setInputState] = useState({
    name: "",
    content: "",
  })
  const [isInputTitle, setIsInputTitle] = useState(true);
  const [isInputContet, setIsInputContet] = useState(true);
  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsInputTitle(false);
    } else {
      setIsInputTitle(true);
    }
    const name = e.target.value;
    setInputState({
      ...inputState,
      name
    });
  }
  const handleOnChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content.length > 0) {
      setIsInputContet(false);
    } else {
      setIsInputContet(true);
    }
    setInputState({
      ...inputState,
      content
    });
  }
  const handleOnClickRegister = async() => {
    try {
      await setMemoToLocalStorage(inputState);
      setMemo({
        name: inputState.name,
        content: inputState.content,
        onClick: async () => {
          await navigator.clipboard.writeText(inputState.content);
        }
      })
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
          disabled={isInputTitle || isInputContet}
        >register</button>
        <button
          onClick={handleOnClickCancel}
        >cancel</button>
      </div>
    </>
  )
}