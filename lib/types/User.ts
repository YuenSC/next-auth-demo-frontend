export enum UserRole {
  User = "USER",
  Admin = "ADMIN",
}

export enum UserProvider {
  email = "EMAIL",
  google = "GOOGLE",
  apple = "APPLE",
}

export interface BackendUser {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
  provider: UserProvider;
}
