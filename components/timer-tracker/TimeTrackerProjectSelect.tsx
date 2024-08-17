import React from "react";
import { HStack } from "../Stack";
import { GoPlusCircle } from "react-icons/go";

const TimeTrackerProjectSelect = () => {
  return (
    <HStack className="group cursor-pointer gap-1 text-primary">
      <GoPlusCircle size={20} />
      <span className="group-hover:underline">Project</span>
    </HStack>
  );
};

export default TimeTrackerProjectSelect;
