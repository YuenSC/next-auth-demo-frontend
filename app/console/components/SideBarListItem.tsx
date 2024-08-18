"use client";

import { HStack } from "@/components/Stack";
import { useTimeTracker } from "@/components/timer-tracker/TimeTrackerContext";
import { SideBarName } from "@/lib/constants/SideBarMenu";
import { useAppSelector } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const SideBarListItem = ({
  icon,
  name: _name,
  isDesktop,
}: {
  name: string;
  icon: ReactNode;
  isDesktop: boolean;
}) => {
  const { isDesktopSidebarCollapsed } = useAppSelector((state) => state.global);
  const {
    stopWatch: { isRunning, formattedTime },
  } = useTimeTracker();

  const name =
    _name === SideBarName.TimeTracker && isRunning ? formattedTime : _name;

  return (
    <HStack
      className={cn("relative gap-5 px-6 py-3", isDesktop && "hidden md:flex")}
    >
      {icon}
      <span
        className={cn(
          "flex-1 transition-all",
          isDesktopSidebarCollapsed &&
            isDesktop &&
            "-ml-5 w-0 whitespace-nowrap opacity-0",
        )}
      >
        {name}
      </span>
    </HStack>
  );
};

export default SideBarListItem;
