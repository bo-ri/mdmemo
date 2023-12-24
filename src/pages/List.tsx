import { ChangeEvent, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { display } from "../state/atoms/display";
import { generateCalendar } from "../libs/templates/calendar";
import { generateDetail } from "../libs/templates/detail";
import { memo } from "../state/atoms/memo";
import "./styles.css";

export const List = () => {
  const [selectedDate, setDate] = useState("");
  const [displaySettings, setDisplaySettings] = useAtom(display);
  const [memoList] = useAtom(memo);
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

  return (
    <>
      <div id="box">
        <table id="main_table">
          <thead><tr><th>name</th><th>params</th><th>action</th></tr></thead>
          <tbody>
            <tr><th>calendar</th><td><input type="month" onChange={handleChange} value={selectedDate} /></td><td><button onClick={handleOnClick}>copy</button></td></tr>
            <tr><th>detail</th><td>---</td><td><button onClick={generateDetail}>copy</button></td></tr>
            {
              memoList.map(item => {
                return <tr><th>{item.name}</th><td>---</td><td><button onClick={item.onClick}>copy</button></td></tr>
              })
            }
          </tbody>
        </table>
        <button onClick={handleOnClickAdd}>+</button>
      </div>
    </>
  )
}