import jsonwebtoken from "jsonwebtoken";
import NextAuth, { CredentialsSignin, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PostLoginResponse } from "./lib/types/Login";
import { signInSchema } from "./lib/zod";
import { ApiErrorResponse } from "./lib/types/ApiResponse";

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
      authorize: async (credentials) => {
        await new Promise((resolve) => setTimeout(resolve, 300)); // add a fake loading

        const parsedCredentials =
          await signInSchema.safeParseAsync(credentials);
        if (parsedCredentials.error) {
          throw new InvalidCredentialError();
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedCredentials.data),
          },
        );

        const jsonResponse = await res.json();

        if (!res.ok) {
          const { message } = jsonResponse as ApiErrorResponse;
          throw new InvalidCredentialError(message);
        }

        const { data } = jsonResponse as PostLoginResponse;
        let user = {
          accessToken: data.access_token,
          id: data.user.id,
          image: "",
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        } satisfies User;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  // Callbacks Docs: https://authjs.dev/reference/nextjs#callbacks
  callbacks: {
    async authorized({ request, auth }) {
      const accessToken = auth?.user?.accessToken ?? "";
      const decoded = jsonwebtoken.decode(accessToken) as {
        exp: number;
      } | null;

      const isAccessTokenExpired = !decoded || Date.now() >= decoded.exp * 1000;
      return !!auth?.user && !isAccessTokenExpired;
    },
    signIn: async ({ account, user }) => {
      if (account?.provider === "google") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/google-login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: account.id_token,
            }),
          },
        );

        if (!res.ok) return false;
        const { data } = (await res.json()) as PostLoginResponse;

        user.email = data.user.email;
        user.name = data.user.name;
        user.accessToken = data.access_token;
        user.id = data.user.id;
        user.role = data.user.role;

        return true;
      }
      return true;
    },
    // Ref: Extending the session https://authjs.dev/guides/extending-the-session
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id ?? token.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});
