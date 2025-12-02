import { apiClient } from './client';
import type { PaginatedResponse } from '../types';


export const apiGet = async <T>(url: string, params?: unknown): Promise<T> => {
  const response = await apiClient.get<T>(url, { params });
  return response.data;
};

export const apiPost = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await apiClient.post<T>(url, data);
  return response.data;
};

export const apiPut = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await apiClient.put<T>(url, data);
  return response.data;
};

export const apiPatch = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await apiClient.patch<T>(url, data);
  return response.data;
};

export const apiDelete = async (url: string): Promise<void> => {
  await apiClient.delete(url);
};

export const apiGetList = async <T>(
  url: string, 
  params?: unknown
): Promise<PaginatedResponse<T>> => {
  const response = await apiClient.get<PaginatedResponse<T>>(url, { params });
  return response.data;
};
