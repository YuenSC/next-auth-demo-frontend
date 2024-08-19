import { TimeEntry, TimeEntryCreatePayload } from "@/lib/types/TimeEntry";
import { cn } from "@/lib/utils";
import Time from "@/lib/utils/Time";
import { format } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HStack } from "../Stack";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TimeTrackerProjectSelect from "./TimeTrackerProjectSelect";
import TimeTrackerNameInput from "./TimeTrackerNameInput";
import { createTimeEntry } from "@/app/actions";
import { getFormData } from "@/lib/utils/getFormData";
import TimeEntryStartButton from "./TimeEntryStartButton";
import TimeEntryMenu from "./TimeEntryMenu";

const getDay = (startTime: string) => {
  return format(startTime, "EEE, MMM d");
};

const getDuration = (entries: TimeEntry[]) => {
  const total = entries.reduce((acc, entry) => {
    if (!entry.endTime) return acc;
    const start = new Date(entry.startTime).getTime();
    const end = new Date(entry.endTime).getTime();
    return acc + (end - start);
  }, 0);

  const { formattedTime } = Time.getTimeFromSeconds(total / 1000);

  return formattedTime;
};

const TimeEntryDay = ({ entries }: { entries: TimeEntry[] }) => {
  return (
    <div className="bg-white">
      <HStack className="justify-between bg-gray-300 p-2 px-4 text-sm">
        <h3>{getDay(entries[0].startTime)}</h3>
        <span className="text-gray-400">
          Total:
          <span className="ml-2 text-lg text-black">
            {getDuration(entries)}
          </span>
        </span>
      </HStack>

      <ul>
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          return (
            <li key={entry.id} className={cn("py-1", !isLast && "border-b")}>
              <HStack className="flex-wrap gap-4 p-2 px-4">
                <HStack className="flex-1 gap-4">
                  <TimeTrackerNameInput entry={entry} className="min-w-60" />
                  <TimeTrackerProjectSelect entry={entry} />
                </HStack>

                <HStack className="flex-1 justify-between gap-4">
                  <HStack className="gap-1 font-mono text-sm">
                    <span>{format(entry.startTime, "HH:mm")}</span>
                    <span>-</span>
                    <span>{format(entry.endTime!, "HH:mm")}</span>
                  </HStack>

                  <span className="font-mono text-sm">
                    {getDuration([entry])}
                  </span>

                  <TimeEntryStartButton entry={entry} />
                  <TimeEntryMenu entry={entry} />
                </HStack>
              </HStack>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TimeEntryDay;
