import { signOut } from "@/auth";
import Link from "next/link";
import { IconType } from "react-icons";
import { FiUser } from "react-icons/fi";
import { GoProject } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";
import { IoCalendarClearOutline, IoDocumentTextOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import SideBarLinkOverlay from "./SideBarLinkOverlay";
import SideBarListItem from "./SideBarListItem";
import SideBarMenuTitle from "./SideBarMenuTitle";

interface SideBarSection {
  title?: string;
  items: {
    name: string;
    href: string;
    icon: IconType;
  }[];
}

const sidebarMenuSections = [
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
        name: "Project",
        href: "/console/project",
        icon: GoProject,
      },
      {
        name: "User",
        href: "/console/users",
        icon: FiUser,
      },
    ],
  },
] as SideBarSection[];

const ProtectedSideBar = () => {
  return (
    <div className="flex max-w-[200px] flex-col border-r bg-white">
      <nav className="min-h-0 flex-1 overflow-auto">
        {sidebarMenuSections.map(({ items, title }, index) => (
          <div key={index}>
            {title && <SideBarMenuTitle title={title} />}
            {items.map(({ name, href, icon: Icon }) => (
              <Link key={name} href={href} passHref className="group relative">
                <SideBarLinkOverlay href={href} />
                <SideBarListItem name={name} icon={<Icon size={24} />} />
              </Link>
            ))}
          </div>
        ))}
      </nav>
      {/* <form action={handleSignOut}>
        <Button className="my-4 w-full" variant="link">
          <IoIosLogOut size={24} />
        </Button>
      </form> */}
    </div>
  );
};

export default ProtectedSideBar;
