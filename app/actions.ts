"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const authenticate = async (
  previousState: string | undefined,
  formData: FormData,
) => {
  try {
    formData.set("redirectTo", "/console");
    await signIn("credentials", formData);
  } catch (error: any) {
    if (error instanceof AuthError) {
      console.log({ ...error });
      return error.message;
    }
    throw error;
  }
};
