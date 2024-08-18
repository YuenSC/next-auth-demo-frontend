export interface TimeEntry {
  id: string;
  name: string;
  startTime: Date;
  endTime?: Date;
  userId: string;
  projectId: string;
}

export interface TimeEntryCreatePayload {
  name: string;
  startTime: string;
  endTime?: string;
  projectId: string;
}

export interface TimeEntryUpdatePayload
  extends Partial<TimeEntryCreatePayload> {
  id: string;
}
