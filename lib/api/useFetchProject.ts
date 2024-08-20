import axios from "axios";
import useSWR from "swr";
import { ApiResponse } from "../types/ApiResponse";
import { Project } from "../types/Project";

export const useFetchProject = (id?: string) => {
  return useSWR<ApiResponse<Project>, Error>(
    id ? [`/api/projects/${id}`] : null,
    async ([url]) => (await axios.get(url)).data,
  );
};
