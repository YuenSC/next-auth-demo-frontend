"use client";

import { TimeEntry } from "@/lib/types/TimeEntry";
import { Input } from "../ui/input";
import { HStack } from "../Stack";
import {
  addDays,
  differenceInCalendarDays,
  differenceInHours,
  format,
  isAfter,
  subDays,
} from "date-fns";
import { updateTimeEntry } from "@/app/actions";
import { getFormData } from "@/lib/utils/getFormData";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

const TimeEntryDateTimeInput = ({ entry }: { entry: TimeEntry }) => {
  const { toast } = useToast();

  const handleTimeUpdate = async (payload: {
    startTime: string;
    endTime: string;
  }) => {
    // if end date is before start date, add a day to end date
    if (isAfter(payload.startTime, payload.endTime)) {
      const newEndTimeTimestamp = addDays(payload.endTime, 1).toISOString();
      payload.endTime = newEndTimeTimestamp;
    }

    // if end date is one day after start date, remove a day from end date
    if (differenceInHours(payload.endTime, payload.startTime) >= 24) {
      const newEndTimeTimestamp = subDays(payload.endTime, 1).toISOString();
      payload.endTime = newEndTimeTimestamp;
    }

    if (
      payload.startTime === entry.startTime &&
      payload.endTime === entry.endTime
    ) {
      return;
    }

    const result = await updateTimeEntry(
      getFormData({
        id: entry.id,
        ...payload,
      }),
    );

    if (result?.error) {
      return toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }

    toast({
      title: "Time entry updated",
      description: `Time entry has been updated successfully.`,
    });
  };

  const dayDiff =
    new Date(entry.endTime!).getDate() - new Date(entry.startTime).getDate();

  return (
    <HStack className="gap-1 text-sm">
      <Input
        className="font-mono"
        type="time"
        defaultValue={format(entry.startTime, "HH:mm")}
        onBlur={(e) => {
          const [hour, minute] = e.target.value.split(":");
          const startTimeTimestamp = new Date(entry.startTime).setHours(
            parseInt(hour),
            parseInt(minute),
          );
          const startTime = new Date(startTimeTimestamp).toISOString();
          handleTimeUpdate({ startTime, endTime: entry.endTime! });
        }}
      />
      <span>-</span>
      <Input
        className="font-mono"
        type="time"
        defaultValue={format(entry.endTime!, "HH:mm")}
        onBlur={(e) => {
          const [hour, minute] = e.target.value.split(":");
          const endTimeTimestamp = new Date(entry.endTime!).setHours(
            parseInt(hour),
            parseInt(minute),
          );
          const endTime = new Date(endTimeTimestamp).toISOString();
          handleTimeUpdate({ startTime: entry.startTime, endTime });
        }}
      />
      <sup className={cn("-top-4 ml-1 text-xs", dayDiff <= 0 && "opacity-0")}>
        +{dayDiff}
      </sup>
    </HStack>
  );
};

export default TimeEntryDateTimeInput;
