import { auth } from "@/auth";
import { HStack } from "@/components/Stack";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import SignInButton from "./SignInButton";

const PublicNavBar = async () => {
  const session = await auth();

  return (
    <HStack className="container min-h-[80px] items-center justify-between gap-4 px-4 py-4 md:px-8">
      <Link href="/">
        <HStack className="gap-2">
          <FaClock className="text-primary" />
          <p className="font-bold">Clockify Clone</p>
        </HStack>
      </Link>

      <HStack className="gap-4">
        <SignInButton isLogin={!!session} />
      </HStack>
    </HStack>
  );
};

export default PublicNavBar;
