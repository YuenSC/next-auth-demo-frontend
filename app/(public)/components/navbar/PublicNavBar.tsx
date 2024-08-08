import { auth } from "@/auth";
import { HStack } from "@/components/Stack";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import SignInButton from "./SignInButton";
import AppLogoLink from "@/components/AppLogoLink";

const PublicNavBar = async () => {
  const session = await auth();

  return (
    <HStack className="container min-h-[80px] items-center justify-between gap-4 px-4 py-4 md:px-8">
      <AppLogoLink />

      <HStack className="gap-4">
        <SignInButton isLogin={!!session} />
      </HStack>
    </HStack>
  );
};

export default PublicNavBar;
