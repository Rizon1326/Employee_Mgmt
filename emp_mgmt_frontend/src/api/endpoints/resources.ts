import { apiGet, apiPost, apiPatch, apiDelete, apiGetList } from '../base';
import type { 
  Role,
  RoleWithDepartment,
  Country, 
  City,
  CityWithCountry,
  Equipment,
  WorkDay,
  RoleFormInput,
  CountryFormInput,
  CityFormInput,
  EquipmentFormInput,
  WorkDayFormInput,
  RoleQueryParams,
  CountryQueryParams,
  CityQueryParams,
  EquipmentQueryParams,
  WorkDayQueryParams,
  PaginatedResponse 
} from '../../types';

export const roleApi = {
  getAll: (params?: RoleQueryParams): Promise<PaginatedResponse<Role>> =>
    apiGetList<Role>('/roles/', params),
  
  getById: (id: number): Promise<RoleWithDepartment> =>
    apiGet<RoleWithDepartment>(`/roles/${id}/`),
  
  create: (data: RoleFormInput): Promise<Role> =>
    apiPost<Role>('/roles/', data),
  
  update: (id: number, data: Partial<RoleFormInput>): Promise<Role> =>
    apiPatch<Role>(`/roles/${id}/`, data),
  
  delete: (id: number): Promise<void> =>
    apiDelete(`/roles/${id}/`),
};

export const countryApi = {
  getAll: (params?: CountryQueryParams): Promise<PaginatedResponse<Country>> =>
    apiGetList<Country>('/countries/', params),
  
  getById: (id: number): Promise<Country> =>
    apiGet<Country>(`/countries/${id}/`),
  
  create: (data: CountryFormInput): Promise<Country> =>
    apiPost<Country>('/countries/', data),
  
  update: (id: number, data: Partial<CountryFormInput>): Promise<Country> =>
    apiPatch<Country>(`/countries/${id}/`, data),
  
  delete: (id: number): Promise<void> =>
    apiDelete(`/countries/${id}/`),
};

export const cityApi = {
  getAll: (params?: CityQueryParams): Promise<PaginatedResponse<City>> =>
    apiGetList<City>('/cities/', params),
  
  getById: (id: number): Promise<CityWithCountry> =>
    apiGet<CityWithCountry>(`/cities/${id}/`),
  
  create: (data: CityFormInput): Promise<City> =>
    apiPost<City>('/cities/', data),
  
  update: (id: number, data: Partial<CityFormInput>): Promise<City> =>
    apiPatch<City>(`/cities/${id}/`, data),
  
  delete: (id: number): Promise<void> =>
    apiDelete(`/cities/${id}/`),
};

export const equipmentApi = {
  getAll: (params?: EquipmentQueryParams): Promise<PaginatedResponse<Equipment>> =>
    apiGetList<Equipment>('/equipment/', params),
  
  getById: (id: number): Promise<Equipment> =>
    apiGet<Equipment>(`/equipment/${id}/`),
  
  create: (data: EquipmentFormInput): Promise<Equipment> =>
    apiPost<Equipment>('/equipment/', data),
  
  update: (id: number, data: Partial<EquipmentFormInput>): Promise<Equipment> =>
    apiPatch<Equipment>(`/equipment/${id}/`, data),
  
  delete: (id: number): Promise<void> =>
    apiDelete(`/equipment/${id}/`),
};

export const workDayApi = {
  getAll: (params?: WorkDayQueryParams): Promise<PaginatedResponse<WorkDay>> =>
    apiGetList<WorkDay>('/workdays/', params),
  
  getById: (id: number): Promise<WorkDay> =>
    apiGet<WorkDay>(`/workdays/${id}/`),
  
  create: (data: WorkDayFormInput): Promise<WorkDay> =>
    apiPost<WorkDay>('/workdays/', data),
  
  update: (id: number, data: Partial<WorkDayFormInput>): Promise<WorkDay> =>
    apiPatch<WorkDay>(`/workdays/${id}/`, data),
  
  delete: (id: number): Promise<void> =>
    apiDelete(`/workdays/${id}/`),
};
