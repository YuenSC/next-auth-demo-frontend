"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

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
