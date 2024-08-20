import { auth } from "@/auth";
import { VStack } from "@/components/Stack";
import { TimeTrackerProvider } from "@/components/timer-tracker/TimeTrackerContext";
import { fetchCurrentTimeEntry } from "@/lib/data";
import ProtectedSideBar from "./components/ProtectedSideBar";
import ProtectedTopBar from "./components/ProtectedTopBar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role = session?.user.role;

  let timeEntry = null;
  try {
    const { data } = await fetchCurrentTimeEntry();
    timeEntry = data;
  } catch (error) {
    console.error(error);
  }

  return (
    <TimeTrackerProvider timeEntry={timeEntry}>
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
