import { FiUser } from "react-icons/fi";
import { GoProject } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";
import { IoCalendarClearOutline, IoDocumentTextOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { RxDashboard } from "react-icons/rx";

export interface SideBarSection {
  title?: string;
  items: {
    name: string;
    href: string;
    icon: IconType;
  }[];
}

export const SidebarMenuSections = [
  {
    title: "",
    items: [
      {
        name: "Dashboard",
        href: "/console",
        icon: RxDashboard,
      },
      {
        name: "Report",
        href: "/console/report",
        icon: IoDocumentTextOutline,
      },
    ],
  },
  {
    title: "Record",
    items: [
      {
        name: "Time Tracker",
        href: "/console/time-tracker",
        icon: IoIosTimer,
      },
      {
        name: "Calendar",
        href: "/console/calendar",
        icon: IoCalendarClearOutline,
      },
    ],
  },
  {
    title: "MANAGE",
    items: [
      {
        name: "Projects",
        href: "/console/projects",
        icon: GoProject,
      },
      {
        name: "Users",
        href: "/console/users",
        icon: FiUser,
      },
    ],
  },
] as SideBarSection[];
