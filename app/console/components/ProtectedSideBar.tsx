import { SidebarMenuSections } from "@/lib/constants/SideBarMenu";
import Link from "next/link";
import SideBarLinkOverlay from "./SideBarLinkOverlay";
import SideBarListItem from "./SideBarListItem";
import SideBarMenuTitle from "./SideBarMenuTitle";
import { auth } from "@/auth";

const ProtectedSideBar = async () => {
  const session = await auth();
  const role = session?.user.role;

  return (
    <div className="flex max-w-[200px] flex-col border-r bg-white">
      <nav className="min-h-0 flex-1 overflow-auto">
        {SidebarMenuSections.map(({ items, title }, index) => (
          <div key={index}>
            {title && <SideBarMenuTitle title={title} />}
            {items.map(({ name, href, icon: Icon, requiredRoles = [] }) => {
              if (requiredRoles.length && role && !requiredRoles.includes(role))
                return null;

              return (
                <Link
                  key={name}
                  href={href}
                  passHref
                  className="group relative"
                >
                  <SideBarLinkOverlay href={href} />
                  <SideBarListItem name={name} icon={<Icon size={24} />} />
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default ProtectedSideBar;
