import { auth, signOut } from "@/auth";
import AppLogoLink from "@/components/AppLogoLink";
import { HStack } from "@/components/Stack";
import { Button } from "@/components/ui/button";
import { IoIosLogOut } from "react-icons/io";
import SideBarToggle from "./SideBarToggle";

const handleSignOut = async () => {
  "use server";
  await signOut({ redirectTo: "/" });
};

const ProtectedTopBar = async () => {
  const session = await auth();
  const role = session?.user?.role;

  return (
    <HStack className="sticky top-0 z-50 justify-between border-b bg-white pl-4">
      <HStack>
        <SideBarToggle role={role} />
        <div className="p-4">
          <AppLogoLink size="lg" />
        </div>
      </HStack>

      <form action={handleSignOut}>
        <Button className="mr-4 px-2 md:mr-8 md:px-4" variant="outline">
          <IoIosLogOut size={24} className="mr-1" />
          <p className="hidden md:block">Sign Out</p>
        </Button>
      </form>
    </HStack>
  );
};

export default ProtectedTopBar;
