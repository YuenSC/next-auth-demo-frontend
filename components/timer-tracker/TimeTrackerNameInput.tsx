import React from "react";
import { Input } from "../ui/input";
import { useTimeTracker } from "./TimeTrackerContext";

const TimeTrackerNameInput = () => {
  const {
    stopWatch: { isRunning },
  } = useTimeTracker();

  return (
    <Input
      placeholder="What are you working on?"
      autoFocus
      name="name"
      disabled={isRunning}
    />
  );
};

export default TimeTrackerNameInput;
