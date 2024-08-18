import { FiUser } from "react-icons/fi";
import { GoProject } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";
import { IoCalendarClearOutline, IoDocumentTextOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { RxDashboard } from "react-icons/rx";
import { UserRole } from "../types/User";

export enum SideBarName {
  Dashboard = "Dashboard",
  Report = "Report",
  TimeTracker = "Time Tracker",
  Calendar = "Calendar",
  Projects = "Projects",
  Users = "Users",
}

export interface SideBarSection {
  title?: string;
  items: {
    name: string;
    href: string;
    icon: IconType;
    requiredRoles?: string[];
  }[];
}

export const SidebarMenuSections = [
  {
    title: "",
    items: [
      {
        name: SideBarName.Dashboard,
        href: "/console",
        icon: RxDashboard,
      },
      {
        name: SideBarName.Report,
        href: "/console/report",
        icon: IoDocumentTextOutline,
      },
    ],
  },
  {
    title: "Record",
    items: [
      {
        name: SideBarName.TimeTracker,
        href: "/console/time-tracker",
        icon: IoIosTimer,
      },
      {
        name: SideBarName.Calendar,
        href: "/console/calendar",
        icon: IoCalendarClearOutline,
      },
    ],
  },
  {
    title: "MANAGE",
    items: [
      {
        name: SideBarName.Projects,
        href: "/console/projects",
        icon: GoProject,
      },
      {
        name: SideBarName.Users,
        href: "/console/users",
        icon: FiUser,
        requiredRoles: [UserRole.Admin],
      },
    ],
  },
] as SideBarSection[];
