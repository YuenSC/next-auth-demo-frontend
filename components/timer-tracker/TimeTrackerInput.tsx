import React from "react";
import { Input } from "../ui/input";
import { HStack } from "../Stack";

const TimeTrackerInput = () => {
  return (
    <HStack className="gap-4 border bg-white p-4">
      <Input placeholder="What are you working on?" autoFocus />
      <div>Project Select</div>
      <div>Time Tracker</div>
      <div>Action Button</div>
    </HStack>
  );
};

export default TimeTrackerInput;
