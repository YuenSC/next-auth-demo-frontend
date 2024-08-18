import { VStack } from "@/components/Stack";
import ProtectedSideBar from "./components/ProtectedSideBar";
import ProtectedTopBar from "./components/ProtectedTopBar";
import { auth } from "@/auth";
import { TimeTrackerProvider } from "@/components/timer-tracker/TimeTrackerContext";
import { TimeEntry } from "@/lib/types/TimeEntry";
import { fetchWithToken } from "@/lib/data";
import { ApiResponse } from "@/lib/types/ApiResponse";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role = session?.user.role;

  let timeEntry = null;
  try {
    const { data } = (await fetchWithToken("/api/time-entries/current", {
      next: {
        tags: ["time-entries/current"],
      },
    })) as ApiResponse<TimeEntry>;
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
