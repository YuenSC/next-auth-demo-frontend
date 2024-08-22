import { Project } from "./Project";

export type DashboardResult = {
  totalTime: string;
  topProject: Project;
  projectsStats: {
    timeLabel: string;
    totalTimeInSpecificDuration: number;
    projects: {
      id: string;
      name: string;
      totalSeconds: number;
    }[];
  }[];
};
