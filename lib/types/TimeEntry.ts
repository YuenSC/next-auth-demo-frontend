export interface TimeEntry {
  id: string;
  name: string;
  startTime: string;
  endTime?: string;
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
