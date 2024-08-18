import TimeEntryWeek from "@/components/timer-tracker/TimeEntryWeek";
import { fetchTimeEntries } from "@/lib/data";
import PageProps from "@/lib/types/PageProps";
import { TimeEntry } from "@/lib/types/TimeEntry";
import { endOfWeek, format, startOfWeek } from "date-fns";

interface GroupedTimeEntries {
  [weekStart: string]: TimeEntry[];
}

const groupTimeEntriesByWeek = (entries: TimeEntry[]): GroupedTimeEntries => {
  return entries.reduce((acc, entry) => {
    const weekStart = format(
      startOfWeek(entry.startTime, { weekStartsOn: 1 }),
      "yyyy-MM-dd",
    );
    const weekEnd = format(
      endOfWeek(entry.startTime, { weekStartsOn: 1 }),
      "yyyy-MM-dd",
    );

    const key = `${weekStart} to ${weekEnd}`;

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(entry);
    return acc;
  }, {} as GroupedTimeEntries);
};

const Page = async ({ searchParams }: PageProps) => {
  const {
    data: { items: timeEntries, meta },
  } = await fetchTimeEntries(searchParams);

  const groupedTimeEntries = groupTimeEntriesByWeek(timeEntries);

  return (
    <div>
      {Object.entries(groupedTimeEntries).map(([week, entries]) => (
        <TimeEntryWeek key={week} week={week} entries={entries} />
      ))}
      {/* Pagination */}
    </div>
  );
};

export default Page;
