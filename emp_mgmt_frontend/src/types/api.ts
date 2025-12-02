// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Django REST Framework pagination response
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Error response from API
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export type ListResponse<T> = PaginatedResponse<T>;

export type DetailResponse<T> = T;

export type CreateResponse<T> = T;

export type UpdateResponse<T> = T;

export interface DeleteResponse {
  message: string;
}
