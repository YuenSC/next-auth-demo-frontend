"use client";

import { HStack } from "@/components/Stack";
import { useAppSelector } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const SideBarListItem = ({
  icon,
  name,
  isDesktop,
}: {
  name: string;
  icon: ReactNode;
  isDesktop: boolean;
}) => {
  const { isDesktopSidebarCollapsed } = useAppSelector((state) => state.global);

  return (
    <HStack
      className={cn("relative gap-5 px-6 py-3", isDesktop && "hidden md:flex")}
    >
      {icon}
      {!isDesktopSidebarCollapsed && isDesktop && <span>{name}</span>}
      {!isDesktop && <span>{name}</span>}
    </HStack>
  );
};

export default SideBarListItem;
