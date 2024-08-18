import { auth } from "@/auth";
import { ApiErrorResponse, ApiPaginatedResponse } from "./types/ApiResponse";
import PageProps from "./types/PageProps";
import { Project } from "./types/Project";
import { BackendUser } from "./types/User";
import { convertSearchParamsToString } from "./utils";
import { TimeEntry } from "./types/TimeEntry";

export const fetchWithToken = async (path: string, init?: RequestInit) => {
  const session = await auth();
  if (!session?.user.accessToken) {
    throw new Error("No access token found");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!res.ok) {
    const { message } = (await res.json()) as ApiErrorResponse;
    throw new Error(message);
  }
  return await res.json();
};

export const fetchUsers = async (searchParams: PageProps["searchParams"]) => {
  return (await fetchWithToken(
    `/api/users?${convertSearchParamsToString(searchParams)}`,
  )) as ApiPaginatedResponse<BackendUser>;
};

export const fetchProjects = async (
  searchParams: PageProps["searchParams"],
) => {
  return (await fetchWithToken(
    `/api/projects?${convertSearchParamsToString(searchParams)}`,
  )) as ApiPaginatedResponse<Project>;
};

export const fetchTimeEntries = async (
  searchParams: PageProps["searchParams"],
) => {
  return (await fetchWithToken(
    `/api/time-entries?${convertSearchParamsToString(searchParams)}`,
  )) as ApiPaginatedResponse<TimeEntry>;
};
