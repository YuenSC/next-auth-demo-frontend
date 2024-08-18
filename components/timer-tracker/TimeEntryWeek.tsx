import { TimeEntry } from "@/lib/types/TimeEntry";
import React from "react";

const TimeEntryWeek = ({
  entries,
  week,
}: {
  week: string;
  entries: TimeEntry[];
}) => {
  console.log(entries[0]);
  return (
    <div>
      <h2>{week}</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>{entry.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimeEntryWeek;
