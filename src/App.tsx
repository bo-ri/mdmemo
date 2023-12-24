import { useAtom } from "jotai";
import { display } from "./state/atoms/display";
import { useMemo } from "react";
import { List } from "./pages/List";
import { Form } from "./pages/Form";

export const App = () => {
  const [displaySettings] = useAtom(display);
  const contents = useMemo(() => {
    switch (displaySettings.status) {
      case 'list': return <List />;
      case 'form': return <Form />;
      default: return null;
    }
  }, [displaySettings]);
  return (
    <>
      {contents}
    </>
  )
}