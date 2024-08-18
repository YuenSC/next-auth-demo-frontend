"use client";

import { PAGE_TITLE } from "@/lib/constants/PageTitle";
import useStopwatch, { Stopwatch } from "@/lib/hooks/useStopWatch";
import { TimeEntry } from "@/lib/types/TimeEntry";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";

interface TimeTrackerContext {
  timeEntry?: TimeEntry;
  stopWatch: Stopwatch;
}

export const TimeTrackerContext = createContext<TimeTrackerContext>({
  timeEntry: undefined,
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
}: PropsWithChildren<{ timeEntry: TimeEntry }>) => {
  const stopWatchProps = useStopwatch({
    onUpdate: ({ formattedTime }) => {
      document.title = `${formattedTime} | ${PAGE_TITLE}`;
    },
    onReset: () => {
      document.title = PAGE_TITLE;
    },
  });

  useEffect(() => {
    if (timeEntry) {
      stopWatchProps.start(new Date(timeEntry.startTime));
    }
  }, [timeEntry]);

  return (
    <TimeTrackerContext.Provider
      value={{ timeEntry, stopWatch: stopWatchProps }}
    >
      {children}
    </TimeTrackerContext.Provider>
  );
};
