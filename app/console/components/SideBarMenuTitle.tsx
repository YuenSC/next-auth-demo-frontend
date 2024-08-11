"use client";

import { useAppSelector } from "@/lib/redux/store";
import React, { use } from "react";

const SideBarMenuTitle = ({ title }: { title?: string }) => {
  const { isSidebarCollapsed } = useAppSelector((state) => state.global);

  if (!title || isSidebarCollapsed) return null;

  return <h3 className="mb-2 ml-4 mt-4 hidden md:block">{title}</h3>;
};

export default SideBarMenuTitle;
