import { VStack } from "@/components/Stack";
import ProtectedSideBar from "./components/ProtectedSideBar";
import ProtectedTopBar from "./components/ProtectedTopBar";
import { auth } from "@/auth";
import { TimeTrackerProvider } from "@/components/timer-tracker/TimeTrackerContext";
import { TimeEntry } from "@/lib/types/TimeEntry";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role = session?.user.role;

  return (
    <TimeTrackerProvider
      timeEntry={
        {
          id: "1",
          projectId: "1",
          startTime: new Date("2024-08-17T05:10:31+0800"),
          endTime: undefined,
          name: "Test",
          userId: "",
        } satisfies TimeEntry
      }
    >
      <VStack className="min-h-screen">
        <ProtectedTopBar />
        <div className="flex w-full flex-1">
          <ProtectedSideBar role={role} isDesktop />
          <div className="w-full flex-1">{children}</div>
        </div>
      </VStack>
    </TimeTrackerProvider>
  );
}
