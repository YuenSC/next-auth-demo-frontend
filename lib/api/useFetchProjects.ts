import queryString from "query-string";
import useSWR from "swr";
import { ApiPaginatedResponse } from "../types/ApiResponse";
import { Project } from "../types/Project";

export const useFetchProjects = (options: {
  searchText?: string;
  limit: number;
}) => {
  return useSWR(["/api/projects", options], async ([url, options]) => {
    const res = await fetch(`${url}?${queryString.stringify(options)}`);
    return (await res.json()) as ApiPaginatedResponse<Project>;
  });
};
