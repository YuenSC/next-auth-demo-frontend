import axios from "axios";
import queryString from "query-string";
import useSWR from "swr";
import { ApiPaginatedResponse } from "../types/ApiResponse";
import { Project } from "../types/Project";

export const useFetchProjects = (options: {
  searchText?: string;
  limit: number;
}) => {
  return useSWR<ApiPaginatedResponse<Project>, Error>(
    ["/api/projects", options],
    async ([url]) =>
      (await axios.get(`${url}?${queryString.stringify(options)}`)).data,
  );
};
