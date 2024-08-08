import jsonwebtoken from "jsonwebtoken";
import NextAuth, { CredentialsSignin, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PostLoginResponse } from "./lib/types/Login";
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
      authorize: async (credentials) => {
        await new Promise((resolve) => setTimeout(resolve, 300)); // add a fake loading

        const parsedCredentials =
          await signInSchema.safeParseAsync(credentials);
        if (parsedCredentials.error) {
          throw new InvalidCredentialError();
        }

        const res = (await fetch(
          `${process.env.BACKEND_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedCredentials.data),
          },
        ).then((res) => res.json())) as PostLoginResponse;

        if (!res) {
          throw new UserNotFoundError("Custom Api Error");
        }

        let user = {
          accessToken: res.data.access_token,
          id: res.data.user.id,
          image: "",
          name: res.data.user.name,
          email: res.data.user.email,
        } satisfies User;
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
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
        const res = (await fetch(
          `${process.env.BACKEND_API_URL}/api/auth/google-login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: account.id_token,
            }),
          },
        ).then((res) => res.json())) as PostLoginResponse;

        if (!res) return false;
        const data = res.data;

        user.email = data.user.email;
        user.name = data.user.name;
        user.accessToken = data.access_token;
        user.id = data.user.id;

        return true;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id ?? token.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
});
