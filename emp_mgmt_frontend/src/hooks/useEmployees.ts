import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from '../api';
import type { 
  Employee, 
  EmployeeWithRelations,
  CreateEmployeeFormInput,
  UpdateEmployeeFormInput,
  EmployeeQueryParams,
  PaginatedResponse,
  ApiError 
} from '../types';

// Query keys for cache management
export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: (params?: EmployeeQueryParams) => [...employeeKeys.lists(), params] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: number) => [...employeeKeys.details(), id] as const,
};

// Get all employees
export const useEmployees = (params?: EmployeeQueryParams) => {
  return useQuery<PaginatedResponse<Employee>, ApiError>({
    queryKey: employeeKeys.list(params),
    queryFn: () => employeeApi.getAll(params),
  });
};

// Get single employee with relations
export const useEmployee = (id: number) => {
  return useQuery<EmployeeWithRelations, ApiError>({
    queryKey: employeeKeys.detail(id),
    queryFn: () => employeeApi.getById(id),
    enabled: !!id,
  });
};

// Create employee
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Employee, ApiError, CreateEmployeeFormInput>({
    mutationFn: employeeApi.create,
    onSuccess: () => {
      // Invalidate employee lists
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
};

// Update employee
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Employee, ApiError, { id: number; data: UpdateEmployeeFormInput }>({
    mutationFn: ({ id, data }) => employeeApi.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific employee and lists
      queryClient.invalidateQueries({ queryKey: employeeKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
};

// Delete employee
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, ApiError, number>({
    mutationFn: employeeApi.delete,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: employeeKeys.detail(deletedId) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
    },
  });
};
