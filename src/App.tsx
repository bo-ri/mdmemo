import { useAtom } from "jotai";
import { display } from "./state/atoms/display";
import { List } from "./pages/List";
import { Form } from "./pages/Form";
import { getMemo } from "./state/atoms/memo";
import { Update } from "./pages/Update";
import "./styles.css";

export const App = () => {
  const [displaySettings] = useAtom(display);
  const [memoList] = useAtom(getMemo);
  return (
    <div className="main">
      {
        displaySettings.status === "form"
          ? <Form />
          : displaySettings.status === "update" && displaySettings.selectedIndex
            ? <Update index={displaySettings.selectedIndex} />
            : <List memoList={memoList} />
      }
    </div>
  )
}