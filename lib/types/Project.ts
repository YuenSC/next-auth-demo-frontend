import { BackendUser } from "./User";

export interface Project {
  id: string;
  name: string;
  description?: string;
  clientName?: string;
  ownerId: string;
  owner: BackendUser;
  timeEntries: any[];
}
