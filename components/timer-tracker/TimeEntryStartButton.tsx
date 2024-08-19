"use client";

import React from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { TimeEntry, TimeEntryCreatePayload } from "@/lib/types/TimeEntry";
import { createTimeEntry } from "@/app/actions";
import { getFormData } from "@/lib/utils/getFormData";

const TimeEntryStartButton = ({ entry }: { entry: TimeEntry }) => {
  const { toast } = useToast();

  const handleCreateEntry = async () => {
    const result = await createTimeEntry(
      getFormData({
        name: entry.name,
        projectId: entry.projectId,
        startTime: new Date().toISOString(),
      } as TimeEntryCreatePayload),
    );
    if (result?.error) {
      return toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }

    const name = (entry.name as string) || "";
    toast({
      title: "Time Tracker started",
      description: `Task ${name} has been created successfully.`,
    });
  };

  return (
    <Button variant="outline" onClick={handleCreateEntry}>
      Start
    </Button>
  );
};

export default TimeEntryStartButton;
