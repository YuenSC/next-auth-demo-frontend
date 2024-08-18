import { useSession } from "next-auth/react";
import queryString from "query-string";
import useSWR from "swr";
import { ApiPaginatedResponse } from "../types/ApiResponse";
import { Project } from "../types/Project";

export const useFetchProjects = (options: {
  searchText?: string;
  limit: number;
}) => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  return useSWR(["/api/projects", options], async ([url, options]) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}?${queryString.stringify(options)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = (await res.json()) as ApiPaginatedResponse<Project>;

    return data;
  });
};
