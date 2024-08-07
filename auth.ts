import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { signInSchema } from "./lib/zod";

class UserNotFoundError extends CredentialsSignin {
  constructor(message?: string) {
    super();
    this.message = message || "User not found.";
  }
}

class InvalidCredentialError extends CredentialsSignin {
  constructor(message?: string) {
    super();
    this.message = message || "Invalid credentials.";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        await new Promise((resolve) => setTimeout(resolve, 300)); // add a fake loading

        const parsedCredentials =
          await signInSchema.safeParseAsync(credentials);
        if (parsedCredentials.error) {
          throw new InvalidCredentialError();
        }

        let user = null;
        if (!user) {
          throw new UserNotFoundError("Custom Api Error");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
});
