import { apiGet, apiPost, apiPatch, apiDelete, apiGetList } from '../base';
import type { 
  Employee, 
  EmployeeWithRelations,
  CreateEmployeeFormInput,
  UpdateEmployeeFormInput,
  EmployeeQueryParams,
  PaginatedResponse 
} from '../../types';


export const employeeApi = {
  getAll: (params?: EmployeeQueryParams): Promise<PaginatedResponse<Employee>> =>
    apiGetList<Employee>('/employees/', params),

  getById: (id: number): Promise<EmployeeWithRelations> =>
    apiGet<EmployeeWithRelations>(`/employees/${id}/`),

  create: (data: CreateEmployeeFormInput): Promise<Employee> =>
    apiPost<Employee>('/employees/', data),

  update: (id: number, data: UpdateEmployeeFormInput): Promise<Employee> =>
    apiPatch<Employee>(`/employees/${id}/`, data),

  delete: (id: number): Promise<void> =>
    apiDelete(`/employees/${id}/`),
};
