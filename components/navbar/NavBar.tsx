import { auth, signIn, signOut } from "@/auth";
import { FaClock } from "react-icons/fa";
import { HStack } from "../Stack";
import { Button } from "../ui/button";
import Link from "next/link";
import SignInButton from "./SignInButton";

const handleSignOut = async () => {
  "use server";
  await signOut({ redirectTo: "/" });
};

const NavBar = async () => {
  const session = await auth();

  return (
    <HStack className="container min-h-[80px] items-center justify-between gap-4 py-4">
      <Link href="/">
        <HStack className="gap-2">
          <FaClock className="text-primary" />
          <p className="font-bold">Clockify Clone</p>
        </HStack>
      </Link>

      <HStack className="gap-4">
        <SignInButton isLogin={!!session} />
        {session && (
          <form action={handleSignOut}>
            <Button>Sign Out</Button>
          </form>
        )}
      </HStack>
    </HStack>
  );
};

export default NavBar;
