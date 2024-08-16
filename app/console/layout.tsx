import { VStack } from "@/components/Stack";
import ProtectedSideBar from "./components/ProtectedSideBar";
import ProtectedTopBar from "./components/ProtectedTopBar";
import { auth } from "@/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role = session?.user.role;

  return (
    <VStack className="min-h-screen">
      <ProtectedTopBar />
      <div className="flex w-full flex-1">
        <ProtectedSideBar role={role} isDesktop />
        <div className="w-full flex-1 overflow-hidden">{children}</div>
      </div>
    </VStack>
  );
}
