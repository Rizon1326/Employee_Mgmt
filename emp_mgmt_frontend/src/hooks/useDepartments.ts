import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentApi } from '../api';
import type { 
  Department, 
  DepartmentFormInput, 
  DepartmentQueryParams,
  PaginatedResponse,
  ApiError 
} from '../types';

// Query keys for cache management
export const departmentKeys = {
  all: ['departments'] as const,
  lists: () => [...departmentKeys.all, 'list'] as const,
  list: (params?: DepartmentQueryParams) => [...departmentKeys.lists(), params] as const,
  details: () => [...departmentKeys.all, 'detail'] as const,
  detail: (id: number) => [...departmentKeys.details(), id] as const,
};

// Get all departments
export const useDepartments = (params?: DepartmentQueryParams) => {
  return useQuery<PaginatedResponse<Department>, ApiError>({
    queryKey: departmentKeys.list(params),
    queryFn: () => departmentApi.getAll(params),
  });
};

// Get single department
export const useDepartment = (id: number) => {
  return useQuery<Department, ApiError>({
    queryKey: departmentKeys.detail(id),
    queryFn: () => departmentApi.getById(id),
    enabled: !!id,
  });
};

// Create department
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Department, ApiError, DepartmentFormInput>({
    mutationFn: departmentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Department, ApiError, { id: number; data: Partial<DepartmentFormInput> }>({
    mutationFn: ({ id, data }) => departmentApi.update(id, data),
    onSuccess: (updatedDepartment) => {
      queryClient.setQueryData(
        departmentKeys.detail(updatedDepartment.id),
        updatedDepartment
      );
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
};

// Delete department
export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, ApiError, number>({
    mutationFn: departmentApi.delete,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: departmentKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
    },
  });
};
