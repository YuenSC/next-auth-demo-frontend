import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const handleSignOut = async () => {
  "use server";
  await signOut({ redirectTo: "/" });
};

const ProtectedSideBar = () => {
  return (
    <div>
      <form action={handleSignOut}>
        <Button>Sign Out</Button>
      </form>
    </div>
  );
};

export default ProtectedSideBar;
