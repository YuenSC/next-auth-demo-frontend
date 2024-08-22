"use client";

import { cn } from "@/lib/utils";
import Time from "@/lib/utils/Time";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Center } from "../Stack";
import { useMemo } from "react";
import { DashboardUtils } from "@/lib/utils/DashboardUtils";
import { DashboardResult } from "@/lib/types/Dashboard";

const convertSecondsToHours = (seconds: number) => {
  const hours = seconds / 3600;
  return `${hours.toFixed(1)}h`;
};

const DashboardBarChartSection = ({
  className,
  data: { projectsStats },
}: {
  className?: string;
  data: DashboardResult;
}) => {
  const { uniqueProjectNames, flattenedData } = useMemo(() => {
    return {
      uniqueProjectNames: DashboardUtils.getUniqueProjectNames(projectsStats),
      flattenedData: DashboardUtils.flattenProjectsStats(projectsStats),
    };
  }, [projectsStats]);

  return (
    <Center className={cn("h-[400px] w-full border pr-6 pt-4", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={flattenedData}>
          <XAxis dataKey="timeLabel" />
          <YAxis
            padding={{ top: 40 }}
            tickFormatter={(value: string) =>
              convertSecondsToHours(Number(value))
            }
          />
          <Tooltip
            cursor={false}
            formatter={(value: string) => convertSecondsToHours(Number(value))}
          />
          <CartesianGrid strokeDasharray="4" vertical={false} />
          {uniqueProjectNames.map((projectName, index) => {
            const isLast = index === uniqueProjectNames.length - 1;
            return (
              <Bar
                key={projectName}
                dataKey={projectName}
                fill={
                  DashboardUtils.projectColors[
                    index % DashboardUtils.projectColors.length
                  ]
                }
                stackId={"a"}
                maxBarSize={50}
                name={projectName}
              >
                {isLast && (
                  <LabelList
                    dataKey="totalTimeInSpecificDuration"
                    position="top"
                    formatter={(value: string) =>
                      Time.getTimeFromSeconds(Number(value)).formattedTime
                    }
                  />
                )}
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </Center>
  );
};

export default DashboardBarChartSection;
