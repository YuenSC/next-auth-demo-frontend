"use client";

import { HStack } from "@/components/Stack";
import { useAppSelector } from "@/lib/redux/store";
import { ReactNode } from "react";

const SideBarListItem = ({ icon, name }: { name: string; icon: ReactNode }) => {
  const { isSidebarCollapsed } = useAppSelector((state) => state.global);

  return (
    <HStack className="relative hidden gap-5 px-6 py-3 md:flex">
      {icon}
      {!isSidebarCollapsed && <span>{name}</span>}
    </HStack>
  );
};

export default SideBarListItem;
