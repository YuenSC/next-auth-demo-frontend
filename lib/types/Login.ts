import { ApiResponse } from "./ApiResponse";
import { BackendUser } from "./User";

export interface PostLoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export type PostLoginResponse = ApiResponse<{
  user: BackendUser;
  access_token: string;
}>;
