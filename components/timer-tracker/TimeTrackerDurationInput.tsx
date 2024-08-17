"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Input } from "../ui/input";
import useStopwatch from "@/lib/hooks/useStopWatch";
import { Button } from "../ui/button";
import { useTimeTracker } from "./TimeTrackerContext";

// const isValidTime = (time: string) => {
//   if (!/^\d{0,2}:\d{0,2}:\d{0,2}$/.test(time)) return false;

//   const [hours, minutes, seconds] = time.split(":").map(Number);
//   if (hours > 99 || minutes > 59 || seconds > 59) {
//     return false;
//   }
//   return true;
// };

// const formatTime = (
//   time: string,
//   originalTime: string,
//   options: { min: number; max: number },
// ) => {
//   if (time.length > 2 || !/^\d+$/.test(time)) {
//     return originalTime;
//   }
//   const value = parseInt(time, 10);
//   if (value < options.min || value > options.max) {
//     return originalTime;
//   }
//   return time.padStart(2, "0");
// };

// const adjustTime = (
//   value: string,
//   valueToChange: number,
//   unit: "hours" | "minutes" | "seconds",
// ) => {
//   let [hours, minutes, seconds] = value.split(":").map(Number);

//   if (unit === "minutes") {
//     minutes += valueToChange;

//     if (minutes >= 60) {
//       minutes = 0;
//       hours += 1;
//     } else if (minutes < 0) {
//       minutes = 59;
//       hours -= 1;
//     }

//     // Ensure hours stay within a valid range (0-99)
//     if (hours < 0) {
//       hours = 0;
//       minutes = 0;
//     } else if (hours > 99) {
//       hours = 99;
//     }
//   }

//   const formattedHours = formatTime(hours.toString(), hours.toString(), {
//     min: 0,
//     max: 99,
//   });
//   const formattedMinutes = formatTime(minutes.toString(), minutes.toString(), {
//     min: 0,
//     max: 59,
//   });
//   const formattedSeconds = formatTime(seconds.toString(), seconds.toString(), {
//     min: 0,
//     max: 59,
//   });

//   return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
// };

// const formatFullTime = (value: string, originalValue: string) => {
//   const [originalHours, originalMinutes, originalSeconds] =
//     originalValue.split(":");
//   const [hours, minutes, seconds] = value.split(":");

//   const formattedHours = formatTime(hours, originalHours, {
//     min: 0,
//     max: 99,
//   });
//   const formattedMinutes = formatTime(minutes, originalMinutes, {
//     min: 0,
//     max: 59,
//   });
//   const formattedSeconds = formatTime(seconds, originalSeconds, {
//     min: 0,
//     max: 59,
//   });

//   return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
// };

const padTime = (time: number) => time.toString().padStart(2, "0");

const TimeTrackerDurationInput = ({}: {
  editable?: boolean;
  startTime?: string;
}) => {
  const { minutes, seconds, hours, start, pause, reset } = useStopwatch({
    onUpdate: ({ totalSeconds, hours, minutes, seconds }) => {
      console.log("totalSeconds", totalSeconds);
      document.title = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
    },
  });

  const { timerRef, timeEntry, setIsRunning } = useTimeTracker();

  useImperativeHandle(timerRef, () => ({ start, pause, reset }), [
    start,
    pause,
    reset,
  ]);

  useEffect(() => {
    if (timeEntry) {
      start(new Date(timeEntry.startTime));
      setIsRunning(true);
    }
  }, [setIsRunning, start, timeEntry]);

  return (
    <Input
      containerClassName="min-w-[125px] max-w-[125px] font-bold"
      className="text-center font-mono"
      value={`${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`}
      disabled
    />
  );
};

TimeTrackerDurationInput.displayName = "TimeTrackerDurationInput";

export default TimeTrackerDurationInput;
