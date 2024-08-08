"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SignInButton = () => {
  const pathname = usePathname();

  if (pathname.includes("/sign-in")) {
    return null;
  }

  return (
    <Link href="/sign-in">
      <Button>Sign In</Button>
    </Link>
  );
};

export default SignInButton;
