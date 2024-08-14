export type ApiResponse<T> = {
  data: T;
  timestamp: string;
  path: string;
};

export type ApiPaginatedResponse<T> = ApiResponse<{
  items: T[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}>;

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
};
