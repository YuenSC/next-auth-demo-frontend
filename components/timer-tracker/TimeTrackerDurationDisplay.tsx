"use client";

import Time from "@/lib/utils/Time";
import { Input } from "../ui/input";
import { useTimeTracker } from "./TimeTrackerContext";

const TimeTrackerDurationDisplay = ({}: {
  editable?: boolean;
  startTime?: string;
}) => {
  const {
    stopWatch: { formattedTime },
  } = useTimeTracker();

  return (
    <Input
      containerClassName="flex-1 font-bold md:w-[150px] md:flex-none"
      className="text-center font-mono"
      value={formattedTime}
      disabled
    />
  );
};

TimeTrackerDurationDisplay.displayName = "TimeTrackerDurationDisplay";

export default TimeTrackerDurationDisplay;
