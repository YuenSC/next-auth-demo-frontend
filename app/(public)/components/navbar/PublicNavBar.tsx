import { auth } from "@/auth";
import AppLogoLink from "@/components/AppLogoLink";
import { HStack } from "@/components/Stack";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInButton from "./SignInButton";

const PublicNavBar = async () => {
  const session = await auth();

  console.log("session", session);

  return (
    <HStack className="container min-h-[80px] items-center justify-between gap-4 px-4 py-4 md:px-8">
      <AppLogoLink />

      <HStack className="gap-4">
        {session ? (
          <Link href="/console">
            <Button>Console</Button>
          </Link>
        ) : (
          <SignInButton />
        )}
      </HStack>
    </HStack>
  );
};

export default PublicNavBar;
