import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { display } from "../state/atoms/display";
import { generateCalendar } from "../libs/templates/calendar";
import { generateDetail } from "../libs/templates/detail";
import { MemoState } from "../state/atoms/memo";
import "./styles.css";

export const List = ({
  memoList
}: {
  memoList: MemoState[]
}) => {
  const [selectedDate, setDate] = useState("");
  const [displaySettings, setDisplaySettings] = useAtom(display);
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate());
    const yyyy = today.getFullYear();
    const mm = ("0" + (today.getMonth() + 1)).slice(-2);
    setDate(`${yyyy}-${mm}`);
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  }
  const handleOnClick = async() => {
    await generateCalendar(new Date(selectedDate));
  }
  const handleOnClickAdd = () => {
    setDisplaySettings({
      ...displaySettings,
      status: "form"
    });
  }
  const handleOnClickUpdate = (index: number) => {
    setDisplaySettings({
      ...displaySettings,
      status: "update",
      selectedIndex: index,
    });
  }

  const customMaps = useMemo(() => {
    return memoList.map((item, index) => {
      return (
        <tr>
          <th>{item.name}</th><td>---</td>
          <td>
            <button onClick={item.onClick}>copy</button>
          </td>
          <td>
            <button onClick={() => handleOnClickUpdate(index + 1)} >update</button>
          </td>
        </tr>
      );
    })
  }, [memoList])

  return (
    <>
      <div id="box">
        <table id="main_table">
          <thead><tr><th>name</th><th>params</th><th>action</th></tr></thead>
          <tbody>
            <tr>
              <th>calendar</th>
              <td>
                <input type="month" onChange={handleChange} value={selectedDate} />
              </td>
              <td>
                <button onClick={handleOnClick}>copy</button>
              </td>
              <td>
                <button disabled>delete</button>
              </td>
            </tr>
            <tr><th>detail</th><td>---</td><td><button onClick={generateDetail}>copy</button></td><td><button disabled>delete</button></td></tr>
            { customMaps }
          </tbody>
        </table>
        <button onClick={handleOnClickAdd}>+</button>
      </div>
    </>
  )
}