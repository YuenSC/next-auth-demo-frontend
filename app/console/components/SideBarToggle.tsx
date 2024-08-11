"use client";

import { Button } from "@/components/ui/button";
import { toggleSidebarCollapsed } from "@/lib/redux/state";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import React from "react";
import { IoMdMenu } from "react-icons/io";

const SideBarToggle = () => {
  const dispatch = useAppDispatch();
  const { isSidebarCollapsed, isDarkMode } = useAppSelector(
    (state) => state.global,
  );

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => dispatch(toggleSidebarCollapsed())}
    >
      <IoMdMenu size={24} />
    </Button>
  );
};

export default SideBarToggle;
