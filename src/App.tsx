import { useAtom } from "jotai";
import { display } from "./state/atoms/display";
import { useMemo } from "react";
import { List } from "./pages/List";

export const App = () => {
  const [displaySettings] = useAtom(display);
  const contents = useMemo(() => {
    switch (displaySettings.status) {
      case 'list': return <List />;
      case 'form': return null;
      default: return null;
    }
  }, [])
  return (
    <>
      {contents}
    </>
  )
}