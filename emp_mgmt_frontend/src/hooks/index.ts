// Export query client and provider
export { queryClient } from './queryClient';
export { QueryProvider } from './QueryProvider';

// Export department hooks
export {
  useDepartments,
  useDepartment,
  useCreateDepartment,
  useUpdateDepartment,
  useDeleteDepartment,
  departmentKeys,
} from './useDepartments';

// Export employee hooks
export {
  useEmployees,
  useEmployee,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
  employeeKeys,
} from './useEmployees';

// Export resource hooks
export {
  useRoles,
  useRolesByDepartment,
  useRole,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  useCountries,
  useCreateCountry,
  useCities,
  useCitiesByCountry,
  useCreateCity,
  useEquipment,
  useCreateEquipment,
  useWorkDays,
  useCreateWorkDay,
  roleKeys,
  countryKeys,
  cityKeys,
  equipmentKeys,
  workDayKeys,
} from './useResources';

// Export settings hook
export { useSettings } from './useSettings';
