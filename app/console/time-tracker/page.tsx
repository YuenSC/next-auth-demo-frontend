import { VStack } from "@/components/Stack";
import TimeEntryWeek from "@/components/timer-tracker/TimeEntryWeek";
import { fetchTimeEntries } from "@/lib/data";
import PageProps from "@/lib/types/PageProps";
import { groupTimeEntries } from "@/lib/utils/groupTimeEntries";

const Page = async ({ searchParams }: PageProps) => {
  const {
    data: { items: timeEntries, meta },
  } = await fetchTimeEntries(searchParams);

  return (
    <VStack className="gap-4">
      {Object.entries(groupTimeEntries(timeEntries, "week")).map(
        ([week, entries]) => (
          <TimeEntryWeek key={week} entries={entries} />
        ),
      )}
      {/* Pagination */}
    </VStack>
  );
};

export default Page;
