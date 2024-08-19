"use client";

import { updateTimeEntry } from "@/app/actions";
import { PAGE_TITLE } from "@/lib/constants/PageTitle";
import useStopwatch, { Stopwatch } from "@/lib/hooks/useStopWatch";
import { TimeEntry } from "@/lib/types/TimeEntry";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { toFormData } from "axios";
import { getFormData } from "@/lib/utils/getFormData";

interface TimeTrackerContext {
  timeEntry: TimeEntry | null;
  stopWatch: Stopwatch;
}

export const TimeTrackerContext = createContext<TimeTrackerContext>({
  timeEntry: null,
  stopWatch: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    formattedTime: "00:00:00",
    isRunning: false,
    pause: () => {},
    reset: () => {},
    start: () => {},
  },
});

export const useTimeTracker = () => {
  const context = useContext(TimeTrackerContext);
  if (!context) {
    throw new Error("useTimeTracker must be used within a TimeTrackerProvider");
  }
  return context;
};

export const TimeTrackerProvider = ({
  children,
  timeEntry,
}: PropsWithChildren<{ timeEntry: TimeEntry | null }>) => {
  const { toast } = useToast();
  const stopWatchProps = useStopwatch({
    onUpdate: ({ formattedTime }) => {
      document.title = `${formattedTime} | ${PAGE_TITLE}`;
    },
    onReset: async () => {
      document.title = PAGE_TITLE;

      if (timeEntry) {
        const name = timeEntry.name || "Task";

        await updateTimeEntry(
          getFormData({
            id: timeEntry.id,
            endTime: new Date().toISOString(),
          }),
        );

        toast({
          title: "Time Tracker stopped",
          description: `${name} has been stopped successfully.`,
        });
      }
    },
  });
  const { start } = stopWatchProps;

  useEffect(() => {
    if (timeEntry) {
      start(new Date(timeEntry.startTime));
    }
  }, [start, timeEntry]);

  return (
    <TimeTrackerContext.Provider
      value={{ timeEntry, stopWatch: stopWatchProps }}
    >
      {children}
    </TimeTrackerContext.Provider>
  );
};
