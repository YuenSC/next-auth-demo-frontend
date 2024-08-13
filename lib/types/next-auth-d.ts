import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "./User";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    role: UserRole;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
    role: UserRole;
  }
}
