import { auth } from "@/auth";
import ConsolePageLayout from "@/components/ConsolePageLayout";
import DashboardDateRangePicker from "@/components/dashboard/DashboardDateRangePicker";

export default async function Home() {
  const session = await auth();

  return (
    <ConsolePageLayout
      title="Dashboard"
      rightComponent={<DashboardDateRangePicker />}
    >
      <p>Test</p>
    </ConsolePageLayout>
  );
}
