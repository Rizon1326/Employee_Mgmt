import type { EmploymentType } from './enums';

export interface BaseEntity {
  id: number;
}

export interface Department extends BaseEntity {
  name: string;
}

export interface Country extends BaseEntity {
  name: string;
}

export interface Equipment extends BaseEntity {
  name: string;
}

export interface WorkDay extends BaseEntity {
  name: string;
}

export interface Role extends BaseEntity {
  name: string;
  department: number; 
}

export interface City extends BaseEntity {
  name: string;
  country: number;
}

export interface RoleWithDepartment extends Omit<Role, 'department'> {
  department: Department;
}

export interface CityWithCountry extends Omit<City, 'country'> {
  country: Country;
}

export interface EmployeePermissions {
  can_view_projects: boolean;
  can_edit_projects: boolean;
  can_delete_projects: boolean;
  can_manage_employees: boolean;
  can_approve_budget: boolean;
}

export interface Employee extends BaseEntity, EmployeePermissions {
  full_name: string;
  email: string;
  phone?: string;
  date_of_birth: string; // ISO date string
  date_joined: string; // ISO date string
  
  department?: number;
  role?: number;
  country?: number;
  city?: number;
  
  employment_type: EmploymentType;
  remote_work: boolean;
  office_work: boolean;
  
  work_days: number[];
  equipment_needed: number[];
}

export interface EmployeeWithRelations extends Omit<Employee, 'department' | 'role' | 'country' | 'city' | 'work_days' | 'equipment_needed'> {
  department?: Department;
  role?: RoleWithDepartment;
  country?: Country;
  city?: CityWithCountry;
  work_days: WorkDay[];
  equipment_needed: Equipment[];
}
