"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

const MainPageLink = (props: Omit<PropsWithChildren<LinkProps>, "href">) => {
  const pathname = usePathname();
  const href = pathname.includes("console") ? "/console" : "/";

  return <Link href={href} {...props} />;
};

export default MainPageLink;
