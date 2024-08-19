import { TimeEntry } from "@/lib/types/TimeEntry";
import { groupTimeEntries } from "@/lib/utils/groupTimeEntries";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { VStack } from "../Stack";
import TimeEntryDay from "./TimeEntryDay";

const getWeekText = (startTime: string) => {
  const weekStart = format(
    startOfWeek(startTime, { weekStartsOn: 1 }),
    "EEE, MMM d",
  );
  const weekEnd = format(
    endOfWeek(startTime, { weekStartsOn: 1 }),
    "EEE, MMM d",
  );

  return `${weekStart} - ${weekEnd}`;
};

const TimeEntryWeek = ({ entries }: { entries: TimeEntry[] }) => {
  return (
    <VStack className="gap-4">
      <h2>{getWeekText(entries[0].startTime)}</h2>
      <VStack className="gap-4">
        {Object.entries(groupTimeEntries(entries, "day")).map(
          ([day, entries]) => (
            <TimeEntryDay key={day} entries={entries} />
          ),
        )}
      </VStack>
    </VStack>
  );
};

export default TimeEntryWeek;
