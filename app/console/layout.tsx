import { Center, HStack, VStack } from "@/components/Stack";
import ProtectedSideBar from "./components/ProtectedSideBar";
import ProtectedTopBar from "./components/ProtectedTopBar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VStack className="min-h-screen">
      <ProtectedTopBar />
      <div className="flex flex-1">
        <ProtectedSideBar />
        <div className="flex-1">{children}</div>
      </div>
    </VStack>
  );
}
