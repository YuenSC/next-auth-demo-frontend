import { signOut } from "@/auth";
import AppLogoLink from "@/components/AppLogoLink";
import { HStack } from "@/components/Stack";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconType } from "react-icons";
import { CiCalendar, CiTimer } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { GoProject } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import SideBarLinkOverlay from "./SideBarLinkOverlay";

const handleSignOut = async () => {
  "use server";
  await signOut({ redirectTo: "/" });
};

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
    title: "Main",
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
        icon: CiTimer,
      },
      {
        name: "Calendar",
        href: "/console/calendar",
        icon: CiCalendar,
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
    <div className="flex min-h-screen min-w-[200px] flex-col border-r bg-white">
      <div className="ml-2 mt-4 p-2">
        <AppLogoLink size="lg" />
      </div>
      <nav className="flex-1">
        {sidebarMenuSections.map(({ items, title }, index) => (
          <div key={index}>
            <h3 className="mb-2 ml-2 mt-4">{title}</h3>
            {items.map(({ name, href, icon: Icon }) => (
              <Link key={name} href={href} passHref className="group relative">
                {/* Overlay */}
                <SideBarLinkOverlay href={href} />

                {/* Link */}
                <HStack className="relative gap-2 p-4 py-3">
                  <Icon size={24} />
                  <span>{name}</span>
                </HStack>
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <form action={handleSignOut}>
        <Button className="mb-16 w-full" variant="link">
          Sign Out
        </Button>
      </form>
    </div>
  );
};

export default ProtectedSideBar;
