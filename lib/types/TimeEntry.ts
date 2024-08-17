export interface TimeEntry {
  id: string;
  name: string;
  startTime: Date;
  endTime?: Date;
  userId: string;
  projectId: string;
}
