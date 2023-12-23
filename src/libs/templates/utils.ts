import { MemoState } from "../../state/atoms/memo";
import { generateCalendar } from "./calendar";
import { generateDetail } from "./detail";

export const generateDefaultTemplates = (): MemoState[] => {
  return [
    {
      name: "calendar",
      onClick: generateCalendar
    },
    {
      name: "detail",
      onClick: generateDetail
    }
  ];
}