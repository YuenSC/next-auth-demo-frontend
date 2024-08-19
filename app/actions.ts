"use server";

import { signIn } from "@/auth";
import { fetchWithToken } from "@/lib/data";
import { TimeEntryUpdatePayload } from "@/lib/types/TimeEntry";
import { AuthError } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";

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

export const postProjectUpdate = async (formData: FormData) => {
  try {
    const id = formData.get("id");
    if (!id) {
      throw new Error("Project ID is required to update a project.");
    }
    await fetchWithToken(`/api/projects/${id}`, {
      body: JSON.stringify(Object.fromEntries(formData)),
      method: "PATCH",
    });

    revalidatePath("/console/projects");
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};

export const deleteProject = async (id: string) => {
  try {
    await fetchWithToken(`/api/projects/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/console/projects");
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};

export const createTimeEntry = async (formData: FormData) => {
  try {
    await fetchWithToken("/api/time-entries", {
      body: JSON.stringify(Object.fromEntries(formData)),
      method: "POST",
    });

    revalidatePath("/console/time-tracker");
    revalidateTag("time-entries/current");
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};

export const updateTimeEntry = async (formData: FormData) => {
  try {
    const id = formData.get("id");
    if (!id) {
      throw new Error("Time Entry ID is required to update a time entry.");
    }

    await fetchWithToken(`/api/time-entries/${id}`, {
      body: JSON.stringify(Object.fromEntries(formData)),
      method: "PATCH",
    });

    revalidatePath("/console/time-tracker");
    revalidateTag("time-entries/current");
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};

export const deleteTimeEntry = async (id: string) => {
  try {
    await fetchWithToken(`/api/time-entries/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/console/time-tracker");
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
};
