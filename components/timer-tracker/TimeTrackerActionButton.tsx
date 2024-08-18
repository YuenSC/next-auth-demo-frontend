"use client";

import { Button } from "../ui/button";
import { useTimeTracker } from "./TimeTrackerContext";

const TimeTrackerActionButton = () => {
  const {
    timeEntry,
    stopWatch: { isRunning, reset },
  } = useTimeTracker();

  if (isRunning) {
    return (
      <Button
        type="button"
        variant="destructive"
        onClick={(e) => {
          e.preventDefault();
          reset();
        }}
        className="w-16"
      >
        Stop
      </Button>
    );
  }

  return (
    <Button className="w-16" type="submit">
      Start
    </Button>
  );
};

export default TimeTrackerActionButton;
