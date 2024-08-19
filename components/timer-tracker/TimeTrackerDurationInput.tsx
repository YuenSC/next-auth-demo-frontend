"use client";

import { TimeEntry } from "@/lib/types/TimeEntry";
import Time from "@/lib/utils/Time";
import { Input } from "../ui/input";
import { useState } from "react";
import { updateTimeEntry } from "@/app/actions";
import { getFormData } from "@/lib/utils/getFormData";
import { useToast } from "../ui/use-toast";
import { addSeconds } from "date-fns";

const isValidDuration = (value: string) => {
  return /^(\d{1,2}:)?(\d{1,2}:)?\d{1,2}$/.test(value);
};

const getTimeFromDuration = (value: string) => {
  const [hour, minute, second] = value.split(":").map((v) => parseInt(v, 10));

  return {
    totalSeconds: hour * 60 * 60 + minute * 60 + second,
    seconds: second,
    minutes: minute,
    hours: hour,
  };
};

const TimeTrackerDurationInput = ({ entry }: { entry: TimeEntry }) => {
  const { toast } = useToast();
  const duration = Time.getDurationFromEntries([entry]);
  const [text, setText] = useState(duration);

  const updateDuration = async (value: string) => {
    const { totalSeconds } = getTimeFromDuration(value);
    const startTime = entry.startTime;
    const newEndTime = addSeconds(startTime, totalSeconds).toISOString();
    const result = await updateTimeEntry(
      getFormData({
        id: entry.id,
        endTime: newEndTime,
      }),
    );

    if (result?.error)
      return toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });

    toast({
      title: "Success",
      description: "Successfully updated entry end time",
    });
  };

  return (
    <Input
      containerClassName="w-[100px] md:flex-none"
      className="text-center font-mono text-sm"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={(e) => {
        const value = e.target.value;
        if (!isValidDuration(value)) return setText(duration);
        updateDuration(value);
      }}
      onKeyDown={(e) => {
        if (!["ArrowUp", "ArrowDown"].includes(e.key)) {
          return;
        }
        if (!isValidDuration(text)) return;
        const { minutes, hours, seconds } = getTimeFromDuration(text);
        const step = e.key === "ArrowUp" ? 1 : -1;
        if (hours === 0 && minutes === 0 && step === -1) return;

        const newMinute =
          (minutes + step) % 60 < 0 ? 59 : (minutes + step) % 60;
        const newHour = hours + Math.floor((minutes + step) / 60);
        const newSecond = seconds;
        setText(Time.getFormattedTime(newHour, newMinute, newSecond));
      }}
    />
  );
};

TimeTrackerDurationInput.displayName = "TimeTrackerDurationInput";

export default TimeTrackerDurationInput;
