import { auth } from "@/auth";
import { ApiErrorResponse, ApiResponse } from "./types/ApiResponse";
import PageProps from "./types/PageProps";
import { BackendUser } from "./types/User";
import { convertSearchParamsToString } from "./utils";

export const fetchWithToken = async (path: string, init?: RequestInit) => {
  const session = await auth();
  if (!session?.user.accessToken) {
    throw new Error("No access token found");
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}${path}`, {
    ...init,
    headers: {
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
  )) as ApiResponse<BackendUser[]>;
};
