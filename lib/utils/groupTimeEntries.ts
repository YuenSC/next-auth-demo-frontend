import { format, startOfWeek } from "date-fns";
import { TimeEntry } from "../types/TimeEntry";

export const groupTimeEntries = (
  entries: TimeEntry[],
  type: "week" | "day",
) => {
  return entries.reduce(
    (acc, entry) => {
      let key = "";

      if (type === "week") {
        key = format(
          startOfWeek(entry.startTime, { weekStartsOn: 1 }),
          "yyyy-MM-dd",
        );
      } else if (type === "day") {
        key = format(entry.startTime, "yyyy-MM-dd");
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(entry);
      return acc;
    },
    {} as Record<string, TimeEntry[]>,
  );
};
