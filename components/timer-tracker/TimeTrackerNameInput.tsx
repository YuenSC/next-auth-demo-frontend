"use client";

import { TimeEntry } from "@/lib/types/TimeEntry";
import { FocusEventHandler, useCallback } from "react";
import { Input } from "../ui/input";
import { updateTimeEntry } from "@/app/actions";
import { getFormData } from "@/lib/utils/getFormData";
import { useToast } from "../ui/use-toast";

const TimeTrackerNameInput = ({
  entry,
  className,
}: {
  entry: TimeEntry | null;
  className?: string;
}) => {
  const { toast } = useToast();

  const handleBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
    const name = e.target.value;
    if (!entry) return;
    if (name === entry?.name) return;

    const result = await updateTimeEntry(
      getFormData({
        id: entry?.id,
        name: name,
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
      title: "Time Tracker updated",
      description: `Task name has been updated successfully.`,
    });
  };

  return (
    <Input
      placeholder="What are you working on?"
      autoFocus
      name="name"
      defaultValue={entry?.name}
      onBlur={handleBlur}
      containerClassName={className}
    />
  );
};

export default TimeTrackerNameInput;
