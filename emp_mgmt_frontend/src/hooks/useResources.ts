import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roleApi, countryApi, cityApi, equipmentApi, workDayApi } from '../api';
import type { 
  Role, RoleWithDepartment, RoleFormInput, RoleQueryParams,
  Country, CountryFormInput, CountryQueryParams,
  City, CityFormInput, CityQueryParams,
  Equipment, EquipmentFormInput, EquipmentQueryParams,
  WorkDay, WorkDayFormInput, WorkDayQueryParams,
  PaginatedResponse, ApiError 
} from '../types';

// ==================== ROLE HOOKS ====================

export const roleKeys = {
  all: ['roles'] as const,
  lists: () => [...roleKeys.all, 'list'] as const,
  list: (params?: RoleQueryParams) => [...roleKeys.lists(), params] as const,
  details: () => [...roleKeys.all, 'detail'] as const,
  detail: (id: number) => [...roleKeys.details(), id] as const,
};

export const useRoles = (params?: RoleQueryParams) => {
  return useQuery<PaginatedResponse<Role>, ApiError>({
    queryKey: roleKeys.list(params),
    queryFn: () => roleApi.getAll(params),
  });
};

export const useRole = (id: number) => {
  return useQuery<RoleWithDepartment, ApiError>({
    queryKey: roleKeys.detail(id),
    queryFn: () => roleApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation<Role, ApiError, RoleFormInput>({
    mutationFn: roleApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation<Role, ApiError, { id: number; data: Partial<RoleFormInput> }>({
    mutationFn: ({ id, data }) => roleApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, number>({
    mutationFn: roleApi.delete,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: roleKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
    },
  });
};

// ==================== COUNTRY HOOKS ====================

export const countryKeys = {
  all: ['countries'] as const,
  lists: () => [...countryKeys.all, 'list'] as const,
  list: (params?: CountryQueryParams) => [...countryKeys.lists(), params] as const,
  details: () => [...countryKeys.all, 'detail'] as const,
  detail: (id: number) => [...countryKeys.details(), id] as const,
};

export const useCountries = (params?: CountryQueryParams) => {
  return useQuery<PaginatedResponse<Country>, ApiError>({
    queryKey: countryKeys.list(params),
    queryFn: () => countryApi.getAll(params),
  });
};

export const useCreateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<Country, ApiError, CountryFormInput>({
    mutationFn: countryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: countryKeys.lists() });
    },
  });
};

// ==================== CITY HOOKS ====================

export const cityKeys = {
  all: ['cities'] as const,
  lists: () => [...cityKeys.all, 'list'] as const,
  list: (params?: CityQueryParams) => [...cityKeys.lists(), params] as const,
  details: () => [...cityKeys.all, 'detail'] as const,
  detail: (id: number) => [...cityKeys.details(), id] as const,
};

export const useCities = (params?: CityQueryParams) => {
  return useQuery<PaginatedResponse<City>, ApiError>({
    queryKey: cityKeys.list(params),
    queryFn: () => cityApi.getAll(params),
  });
};

export const useCreateCity = () => {
  const queryClient = useQueryClient();
  return useMutation<City, ApiError, CityFormInput>({
    mutationFn: cityApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
    },
  });
};

// ==================== EQUIPMENT HOOKS ====================

export const equipmentKeys = {
  all: ['equipment'] as const,
  lists: () => [...equipmentKeys.all, 'list'] as const,
  list: (params?: EquipmentQueryParams) => [...equipmentKeys.lists(), params] as const,
};

export const useEquipment = (params?: EquipmentQueryParams) => {
  return useQuery<PaginatedResponse<Equipment>, ApiError>({
    queryKey: equipmentKeys.list(params),
    queryFn: () => equipmentApi.getAll(params),
  });
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();
  return useMutation<Equipment, ApiError, EquipmentFormInput>({
    mutationFn: equipmentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.lists() });
    },
  });
};

// ==================== WORKDAY HOOKS ====================

export const workDayKeys = {
  all: ['workdays'] as const,
  lists: () => [...workDayKeys.all, 'list'] as const,
  list: (params?: WorkDayQueryParams) => [...workDayKeys.lists(), params] as const,
};

export const useWorkDays = (params?: WorkDayQueryParams) => {
  return useQuery<PaginatedResponse<WorkDay>, ApiError>({
    queryKey: workDayKeys.list(params),
    queryFn: () => workDayApi.getAll(params),
  });
};

export const useCreateWorkDay = () => {
  const queryClient = useQueryClient();
  return useMutation<WorkDay, ApiError, WorkDayFormInput>({
    mutationFn: workDayApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workDayKeys.lists() });
    },
  });
};
