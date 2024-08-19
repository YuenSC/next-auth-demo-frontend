"use client";

import { createTimeEntry } from "@/app/actions";
import { useCallback } from "react";
import { HStack } from "../Stack";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import TimeTrackerActionButton from "./TimeTrackerActionButton";
import { useTimeTracker } from "./TimeTrackerContext";
import TimeTrackerDurationDisplay from "./TimeTrackerDurationDisplay";
import TimeTrackerNameInput from "./TimeTrackerNameInput";
import TimeTrackerProjectSelect from "./TimeTrackerProjectSelect";

const TimeTrackerInput = () => {
  const { toast } = useToast();
  const { timeEntry } = useTimeTracker();

  const formAction = useCallback(
    async (payload: FormData) => {
      payload.set("startTime", new Date().toISOString());
      const result = await createTimeEntry(payload);
      if (result?.error) {
        return toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }

      const name = (payload.get("name") as string) || "";
      toast({
        title: "Time Tracker started",
        description: `Task ${name} has been created successfully.`,
      });
    },
    [toast],
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={timeEntry?.id} />
      <HStack className="flex-wrap justify-end gap-4 border bg-white p-4 shadow-lg md:justify-between">
        <HStack className="flex-1 basis-full gap-4 md:basis-0">
          <TimeTrackerNameInput entry={timeEntry} />
          <TimeTrackerSeparator />
          <TimeTrackerProjectSelect />
          <TimeTrackerSeparator />
        </HStack>
        <TimeTrackerDurationDisplay />
        <TimeTrackerSeparator />
        <TimeTrackerActionButton />
      </HStack>
    </form>
  );
};

export default TimeTrackerInput;

const TimeTrackerSeparator = () => {
  return (
    <Separator
      orientation="vertical"
      className="hidden h-auto self-stretch md:block"
    />
  );
};
