import ConsolePageLayout from "@/components/ConsolePageLayout";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import DashboardDateRangePicker from "@/components/dashboard/DashboardDateRangePicker";
import DashboardRecentTasks from "@/components/dashboard/DashboardRecentTasks";
import { HStack } from "@/components/Stack";

export default async function Home() {
  return (
    <ConsolePageLayout
      title="Dashboard"
      rightComponent={<DashboardDateRangePicker />}
    >
      <HStack className="flex-col-reverse items-stretch gap-4 lg:flex-row">
        <div className="flex-[3]">
          <DashboardCharts />
        </div>
        <div className="flex-1">
          <DashboardRecentTasks />
        </div>
      </HStack>
    </ConsolePageLayout>
  );
}
