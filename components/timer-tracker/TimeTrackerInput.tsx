"use client";

import { createTimeEntry } from "@/app/actions";
import { useCallback } from "react";
import { useFormState } from "react-dom";
import { HStack } from "../Stack";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import TimeTrackerActionButton from "./TimeTrackerActionButton";
import TimeTrackerDurationInput from "./TimeTrackerDurationInput";
import TimeTrackerNameInput from "./TimeTrackerNameInput";
import TimeTrackerProjectSelect from "./TimeTrackerProjectSelect";

const TimeTrackerInput = () => {
  const { toast } = useToast();

  const handleCreateTimeEntry = useCallback(
    async (state: string | undefined, payload: FormData) => {
      payload.set("startTime", new Date().toISOString());
      const result = await createTimeEntry(payload);
      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return result.error;
      }
      const name = (payload.get("name") as string) || "";
      toast({
        title: "Time Tracker started",
        description: `Task ${name} has been created successfully.`,
      });
    },
    [toast],
  );

  const [_errorMessage, formAction] = useFormState(handleCreateTimeEntry, "");

  return (
    <form action={formAction}>
      <HStack className="gap-4 border bg-white p-4 shadow-lg">
        <TimeTrackerNameInput />
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <TimeTrackerProjectSelect />
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <TimeTrackerDurationInput />
        <Separator orientation="vertical" className="h-auto self-stretch" />
        <TimeTrackerActionButton />
      </HStack>
    </form>
  );
};

export default TimeTrackerInput;
