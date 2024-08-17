"use client";

import { TimeEntry } from "@/lib/types/TimeEntry";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";

interface TimeTrackerContext {
  timerRef: React.MutableRefObject<{
    start: (prevTime: Date) => void;
    pause: () => void;
    reset: () => void;
  }>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  timeEntry?: TimeEntry;
}

export const TimeTrackerContext = createContext<TimeTrackerContext>({
  timerRef: {
    current: {
      start: () => {},
      pause: () => {},
      reset: () => {},
    },
  },
  isRunning: false,
  setIsRunning: () => {},
  timeEntry: undefined,
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
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef({
    start: () => {},
    pause: () => {},
    reset: () => {},
  });

  return (
    <TimeTrackerContext.Provider
      value={{ timerRef, isRunning, setIsRunning, timeEntry }}
    >
      {children}
    </TimeTrackerContext.Provider>
  );
};
