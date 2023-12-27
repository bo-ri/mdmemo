import { useAtom } from "jotai";
import { display } from "./state/atoms/display";
import { List } from "./pages/List";
import { Form } from "./pages/Form";
import { getMemo } from "./state/atoms/memo";

export const App = () => {
  const [displaySettings] = useAtom(display);
  const [memoList] = useAtom(getMemo);
  return (
    <>
      {
        displaySettings.status === "form"
          ? <Form />
          : <List memoList={memoList} />
      }
    </>
  )
}