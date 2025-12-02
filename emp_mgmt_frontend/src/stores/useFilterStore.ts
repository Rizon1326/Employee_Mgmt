import { create } from 'zustand';
import type { EmployeeQueryParams, DepartmentQueryParams } from '../types';

interface FilterState {
  // Employee filters
  employeeFilters: EmployeeQueryParams;
  
  // Department filters  
  departmentFilters: DepartmentQueryParams;
  
  // Actions
  setEmployeeFilters: (filters: Partial<EmployeeQueryParams>) => void;
  resetEmployeeFilters: () => void;
  setDepartmentFilters: (filters: Partial<DepartmentQueryParams>) => void;
  resetDepartmentFilters: () => void;
}

// Default filter values
const defaultEmployeeFilters: EmployeeQueryParams = {
  page: 1,
  page_size: 10,
  search: '',
};

const defaultDepartmentFilters: DepartmentQueryParams = {
  page: 1,
  page_size: 10,
  search: '',
};

// Create filter store
export const useFilterStore = create<FilterState>((set) => ({
  // Initial state
  employeeFilters: defaultEmployeeFilters,
  departmentFilters: defaultDepartmentFilters,
  
  // Employee filter actions
  setEmployeeFilters: (filters) => set((state) => ({
    employeeFilters: { ...state.employeeFilters, ...filters }
  })),
  
  resetEmployeeFilters: () => set({
    employeeFilters: defaultEmployeeFilters
  }),
  
  // Department filter actions
  setDepartmentFilters: (filters) => set((state) => ({
    departmentFilters: { ...state.departmentFilters, ...filters }
  })),
  
  resetDepartmentFilters: () => set({
    departmentFilters: defaultDepartmentFilters
  }),
}));
