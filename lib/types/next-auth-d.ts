import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
  }
}
