import { MemoState } from "../../state/atoms/memo";
import {
  call,
  // generateCalendar
 } from "./calendar";
import { generateDetail } from "./detail";

export const generateDefaultTemplates = (): MemoState[] => {
  return [
    {
      name: "calendar",
      onClick: call
    },
    {
      name: "detail",
      onClick: generateDetail
    }
  ];
}