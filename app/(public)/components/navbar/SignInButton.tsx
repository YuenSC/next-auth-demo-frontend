"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SignInButton = ({ isLogin }: { isLogin: boolean }) => {
  const pathname = usePathname();

  if (isLogin) {
    return null;
  }

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
