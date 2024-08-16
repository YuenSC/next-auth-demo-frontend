"use client";

import { useAppSelector } from "@/lib/redux/store";
import { cn } from "@/lib/utils";

const SideBarMenuTitle = ({
  title,
  isDesktop,
}: {
  title?: string;
  isDesktop?: boolean;
}) => {
  const { isDesktopSidebarCollapsed } = useAppSelector((state) => state.global);

  if (!title || (isDesktopSidebarCollapsed && isDesktop)) return null;

  return (
    <h3 className={cn("mb-2 ml-4 mt-4", isDesktop && "hidden md:block")}>
      {title}
    </h3>
  );
};

export default SideBarMenuTitle;
