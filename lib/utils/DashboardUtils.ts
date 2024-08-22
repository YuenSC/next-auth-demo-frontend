import { DashboardResult } from "../types/Dashboard";

export class DashboardUtils {
  static projectColors = [
    "#4799eb",
    "#f7b924",
    "#f77067",
    "#0acf97",
    "#a55eea",
  ];

  static flattenProjectsStats = (
    projectsStats: DashboardResult["projectsStats"],
  ) => {
    return projectsStats.map((entry) => {
      const { timeLabel, totalTimeInSpecificDuration, projects } = entry;
      const projectData = projects.reduce(
        (acc, project) => {
          acc[project.name] = project.totalSeconds;
          return acc;
        },
        {} as Record<string, number>,
      );
      return { timeLabel, totalTimeInSpecificDuration, ...projectData };
    });
  };

  static getProjectTimeSum = (
    projectsStats: DashboardResult["projectsStats"],
  ) => {
    const projectTimeMap = projectsStats
      .flatMap(({ projects }) => projects)
      .reduce(
        (acc, { id, totalSeconds, name }) => {
          acc[id] = {
            name: name,
            totalSeconds: (acc[id]?.totalSeconds || 0) + totalSeconds,
          };
          return acc;
        },
        {} as Record<string, { name: string; totalSeconds: number }>,
      ); // ProjectId -> totalSeconds

    return Object.entries(projectTimeMap).map(
      ([projectId, { name, totalSeconds }]) => ({
        name,
        projectId,
        totalSeconds,
      }),
    );
  };

  static getTotalTime = (projectsStats: DashboardResult["projectsStats"]) => {
    return projectsStats.reduce(
      (acc, { totalTimeInSpecificDuration }) =>
        acc + totalTimeInSpecificDuration,
      0,
    );
  };

  static getUniqueProjectNames = (
    projectsStats: DashboardResult["projectsStats"],
  ) => {
    return Array.from(
      new Set(
        projectsStats.flatMap((entry) =>
          entry.projects.map((project) => project.name),
        ),
      ),
    );
  };
}
