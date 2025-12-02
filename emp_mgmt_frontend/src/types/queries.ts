import { EmploymentType } from './enums';

export interface BaseQueryParams {
  page?: number;
  page_size?: number;
  ordering?: string;
  search?: string;
}

export interface DepartmentQueryParams extends BaseQueryParams {
  name?: string;
}

export interface EmployeeQueryParams extends BaseQueryParams {
  department?: number;
  role?: number;
  employment_type?: EmploymentType;
  country?: number;
  city?: number;
  remote_work?: boolean;
  office_work?: boolean;
  can_view_projects?: boolean;
  can_edit_projects?: boolean;
  can_delete_projects?: boolean;
  can_manage_employees?: boolean;
  can_approve_budget?: boolean;
}

export interface RoleQueryParams extends BaseQueryParams {
  department?: number;
  name?: string;
}

export interface CityQueryParams extends BaseQueryParams {
  country?: number;
  name?: string;
}

export interface CountryQueryParams extends BaseQueryParams {
  name?: string;
}

export interface EquipmentQueryParams extends BaseQueryParams {
  name?: string;
}

export interface WorkDayQueryParams extends BaseQueryParams {
  name?: string;
}
