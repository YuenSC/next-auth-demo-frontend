"use server";

import { signIn } from "@/auth";
import { fetchWithToken } from "@/lib/data";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const authenticate = async (
  previousState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn("credentials", formData);
  } catch (error: any) {
    if (error instanceof AuthError) {
      return error.message;
    }
    throw error;
  }
};

export const postProjectCreate = async (formData: FormData) => {
  try {
    await fetchWithToken("/api/projects", {
      body: JSON.stringify(Object.fromEntries(formData)),
      method: "POST",
    });

    revalidatePath("/console/projects");
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};
