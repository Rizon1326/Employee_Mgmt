import { EmploymentType } from './enums';

export interface DepartmentFormInput {
  name: string;
}

export interface CountryFormInput {
  name: string;
}

export interface EquipmentFormInput {
  name: string;
}
export interface WorkDayFormInput {
  name: string;
}

export interface RoleFormInput {
  name: string;
  department: number;
}
export interface CityFormInput {
  name: string;
  country: number;
}
export interface CreateEmployeeFormInput {
  full_name: string;
  email: string;
  phone?: string;
  date_of_birth: string; 
  
  department?: number;
  role?: number;
  country?: number;
  city?: number;
  
  employment_type: EmploymentType;
  remote_work: boolean;
  office_work: boolean;
  
  work_days: number[];
  equipment_needed: number[];
  
  can_view_projects: boolean;
  can_edit_projects: boolean;
  can_delete_projects: boolean;
  can_manage_employees: boolean;
  can_approve_budget: boolean;
}

export interface UpdateEmployeeFormInput extends Partial<CreateEmployeeFormInput> {
  email: string; 
}
