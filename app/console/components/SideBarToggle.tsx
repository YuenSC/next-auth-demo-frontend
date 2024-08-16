"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toggleSidebarCollapsed } from "@/lib/redux/state";
import { useAppDispatch } from "@/lib/redux/store";
import { UserRole } from "@/lib/types/User";
import { IoMdMenu } from "react-icons/io";
import ProtectedSideBar from "./ProtectedSideBar";
import AppLogoLink from "@/components/AppLogoLink";
import { HStack } from "@/components/Stack";

const SideBarToggle = ({ role }: { role?: UserRole }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="hidden md:flex"
        onClick={() => dispatch(toggleSidebarCollapsed())}
      >
        <IoMdMenu size={24} />
      </Button>

      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => dispatch(toggleSidebarCollapsed())}
          >
            <IoMdMenu size={24} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full max-w-[250px]">
          <HStack className="h-[64px] gap-4 p-4">
            <DrawerClose asChild>
              <Button variant="outline" size="icon">
                <IoMdMenu size={24} />
              </Button>
            </DrawerClose>
            <AppLogoLink size="lg" />
          </HStack>
          <ProtectedSideBar isDesktop={false} role={role} />

          <DrawerFooter>
            <div>Version 1.0.0</div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBarToggle;
