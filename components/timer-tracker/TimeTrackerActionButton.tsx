"use client";

import React from "react";
import { Button } from "../ui/button";
import { useTimeTracker } from "./TimeTrackerContext";

const TimeTrackerActionButton = () => {
  const { timerRef, setIsRunning, isRunning } = useTimeTracker();

  if (isRunning) {
    return (
      <Button
        variant="destructive"
        onClick={() => {
          timerRef.current.reset();
          setIsRunning(false);
        }}
      >
        Stop
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      onSubmit={() => {
        timerRef.current.start(new Date());
        setIsRunning(true);
      }}
    >
      Start
    </Button>
  );
};

export default TimeTrackerActionButton;
