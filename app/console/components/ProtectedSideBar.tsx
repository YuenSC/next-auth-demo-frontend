import { SidebarMenuSections } from "@/lib/constants/SideBarMenu";
import { UserRole } from "@/lib/types/User";
import Link from "next/link";
import SideBarLinkOverlay from "./SideBarLinkOverlay";
import SideBarListItem from "./SideBarListItem";
import SideBarMenuTitle from "./SideBarMenuTitle";
import { DrawerClose } from "@/components/ui/drawer";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

const ProtectedSideBar = ({
  role,
  isDesktop,
}: {
  role?: UserRole;
  isDesktop: boolean;
}) => {
  return (
    <div className={cn("flex flex-col bg-white", !isDesktop && "h-full")}>
      <nav className="h-full min-h-0 flex-1 overflow-auto">
        {SidebarMenuSections.map(({ items, title }, index) => (
          <div key={index}>
            {title && <SideBarMenuTitle title={title} isDesktop={isDesktop} />}
            {items.map(({ name, href, icon: Icon, requiredRoles = [] }) => {
              if (requiredRoles.length && role && !requiredRoles.includes(role))
                return null;

              const content = (
                <Link href={href} passHref className="group relative">
                  <SideBarLinkOverlay href={href} />
                  <SideBarListItem
                    name={name}
                    icon={<Icon size={24} />}
                    isDesktop={isDesktop}
                  />
                </Link>
              );

              if (isDesktop) {
                return <Fragment key={name}>{content}</Fragment>;
              }

              return (
                <DrawerClose key={name} asChild>
                  {content}
                </DrawerClose>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default ProtectedSideBar;
