import { TimeEntry } from "@/lib/types/TimeEntry";
import { cn } from "@/lib/utils";
import Time from "@/lib/utils/Time";
import { differenceInSeconds, format } from "date-fns";
import { HStack, VStack } from "../Stack";
import TimeEntryDateTimeInput from "./TimeEntryDateTimeInput";
import TimeEntryMenu from "./TimeEntryMenu";
import TimeEntryStartButton from "./TimeEntryStartButton";
import TimeTrackerNameInput from "./TimeTrackerNameInput";
import TimeTrackerProjectSelect from "./TimeTrackerProjectSelect";
import TimeTrackerDurationInput from "./TimeTrackerDurationInput";

const TimeEntryDay = ({ entries }: { entries: TimeEntry[] }) => {
  return (
    <div className="bg-white">
      <HStack className="justify-between bg-gray-300 p-2 px-4 text-sm">
        <h3>{format(entries[0].startTime, Time.timeFormat)}</h3>
        <span className="text-gray-400">
          Total:
          <span className="ml-2 text-lg text-black">
            {Time.getDurationFromEntries(entries)}
          </span>
        </span>
      </HStack>

      <ul>
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;

          return (
            <li key={entry.id} className={cn("py-1", !isLast && "border-b")}>
              <VStack className="flex-wrap gap-4 p-2 px-4 lg:flex-row">
                <HStack className="min-w-full flex-1 flex-col items-stretch gap-4 md:min-w-[300px] md:flex-row">
                  <HStack className="flex-1 gap-4">
                    <TimeTrackerNameInput
                      entry={entry}
                      className="md:min-w-0"
                    />
                    <span className="font-mono text-sm md:hidden">
                      {Time.getDurationFromEntries([entry])}
                    </span>
                  </HStack>
                  <TimeTrackerProjectSelect entry={entry} />
                </HStack>

                <HStack className="flex-1 flex-wrap justify-center gap-4 lg:flex-nowrap">
                  <TimeEntryDateTimeInput entry={entry} />

                  <TimeTrackerDurationInput entry={entry} />

                  <TimeEntryStartButton entry={entry} />
                  <TimeEntryMenu entry={entry} />
                </HStack>
              </VStack>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TimeEntryDay;
