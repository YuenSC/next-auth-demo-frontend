"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

const SideBarLinkOverlay = ({ href }: { href: string }) => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "absolute h-full w-full -translate-x-full bg-slate-200 transition-all group-hover:translate-x-0",
        { "translate-x-0": pathname === href },
      )}
    />
  );
};

export default SideBarLinkOverlay;
