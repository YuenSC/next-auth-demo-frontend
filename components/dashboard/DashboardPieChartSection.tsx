"use client";

import { DashboardResult } from "@/lib/types/Dashboard";
import { cn } from "@/lib/utils";
import { DashboardUtils } from "@/lib/utils/DashboardUtils";
import Time from "@/lib/utils/Time";
import { useMemo } from "react";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { HStack } from "../Stack";

const DashboardPieChartSection = ({
  className,
  data: { projectsStats },
}: {
  className?: string;
  data: DashboardResult;
}) => {
  const { projectTimeSum, totalTime } = useMemo(() => {
    return {
      projectTimeSum: DashboardUtils.getProjectTimeSum(projectsStats),
      totalTime: Time.getTimeFromSeconds(
        DashboardUtils.getTotalTime(projectsStats),
      ).formattedTime,
    };
  }, [projectsStats]);

  return (
    <HStack className={cn("border pr-6", className)}>
      <div className="h-[300px] w-[50%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={projectTimeSum}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="totalSeconds"
            >
              {projectTimeSum.map(({ projectId, name }, index) => (
                <Cell
                  key={projectId}
                  name={name}
                  style={{ outline: "none" }}
                  fill={
                    DashboardUtils.projectColors[
                      index % DashboardUtils.projectColors.length
                    ]
                  }
                />
              ))}
              <Label value={totalTime} position="center" />
            </Pie>
            <Tooltip
              cursor={false}
              formatter={(value: number) =>
                Time.getTimeFromSeconds(value).formattedTime
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          {projectTimeSum.map(({ projectId, name, totalSeconds }, index) => (
            <div key={projectId} className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor:
                    DashboardUtils.projectColors[
                      index % DashboardUtils.projectColors.length
                    ],
                }}
              />
              <div>
                {name} - {Time.getTimeFromSeconds(totalSeconds).formattedTime}
              </div>
            </div>
          ))}
        </div>
      </div>
    </HStack>
  );
};

export default DashboardPieChartSection;
