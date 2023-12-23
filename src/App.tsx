import { useAtom } from "jotai";
import { display } from "./state/atoms/display";

export const App = () => {
  const [displaySettings] = useAtom(display);
  return (
    <>
      <h1>{displaySettings.status}</h1>
    </>
  )
}