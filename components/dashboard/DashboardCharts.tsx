import { ApiResponse } from "@/lib/types/ApiResponse";
import { Project } from "@/lib/types/Project";
import { UserProvider, UserRole } from "@/lib/types/User";
import { HStack, VStack } from "../Stack";
import DashboardBarChartSection from "./DashboardBarChartSection";
import DashboardItem from "./DashboardItem";
import DashboardPieChartSection from "./DashboardPieChartSection";
import { DashboardResult } from "@/lib/types/Dashboard";

const generateProjectData = () => {
  const projectOneSeconds = Math.floor(Math.random() * 10000);
  const projectTwoSeconds = Math.floor(Math.random() * 10000);
  const projectThreeSeconds = Math.floor(Math.random() * 10000);
  const sum = projectOneSeconds + projectTwoSeconds + projectThreeSeconds;

  return {
    totalTimeInSpecificDuration: sum,
    projects: [
      {
        id: "project-1",
        name: "Project 1",
        totalSeconds: projectOneSeconds,
      },
      {
        id: "project-2",
        name: "Project 2",
        totalSeconds: projectTwoSeconds,
      },
      {
        id: "project-3",
        name: "Project 3",
        totalSeconds: projectThreeSeconds,
      },
    ],
  };
};

const fetchDashboard = async () => {
  "use server";
  // wait 3s;

  return {
    data: {
      totalTime: "12:00:00",
      topProject: {
        id: "1",
        name: "Airside",
        clientName: "Talkbox",
        description: "Airside project",
        timeEntries: [],
        owner: {
          id: "1",
          email: "",
          provider: UserProvider.google,
          role: UserRole.Admin,
          name: "John Doe",
        },
        ownerId: "1",
      },
      projectsStats: [
        {
          timeLabel: "Jan",
          ...generateProjectData(),
        },
        {
          timeLabel: "Feb",
          ...generateProjectData(),
        },
        {
          timeLabel: "Mar",
          ...generateProjectData(),
        },
        {
          timeLabel: "Apr",
          ...generateProjectData(),
        },
        {
          timeLabel: "May",
          ...generateProjectData(),
        },
        {
          timeLabel: "Jun",
          ...generateProjectData(),
        },
        {
          timeLabel: "Sep",
          ...generateProjectData(),
        },
        {
          timeLabel: "Oct",
          ...generateProjectData(),
        },
        {
          timeLabel: "Nov",
          ...generateProjectData(),
        },
        {
          timeLabel: "Dec",
          ...generateProjectData(),
        },
      ],
    },
    path: "/api/dashboard",
    timestamp: new Date().toISOString(),
  } satisfies ApiResponse<DashboardResult>;
};

const DashboardCharts = async () => {
  const { data } = await fetchDashboard();

  return (
    <VStack className="w-full bg-white">
      <HStack className="flex-col items-stretch md:flex-row">
        <DashboardItem
          title="Total time"
          value="12:00:00"
          className="border-b-0 md:border-b md:border-r-0"
        />
        <DashboardItem title="Top project" value="Airside" />
      </HStack>

      <DashboardBarChartSection data={data} className="border-t-0" />
      <DashboardPieChartSection data={data} className="border-t-0" />
    </VStack>
  );
};

export default DashboardCharts;
