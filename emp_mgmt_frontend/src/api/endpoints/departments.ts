import { apiGet, apiPost, apiPatch, apiDelete, apiGetList } from '../base';
import type { 
  Department, 
  DepartmentFormInput, 
  DepartmentQueryParams,
  PaginatedResponse 
} from '../../types';


export const departmentApi = {
  getAll: (params?: DepartmentQueryParams): Promise<PaginatedResponse<Department>> =>
    apiGetList<Department>('/departments/', params),

  getById: (id: number): Promise<Department> =>
    apiGet<Department>(`/departments/${id}/`),

  create: (data: DepartmentFormInput): Promise<Department> =>
    apiPost<Department>('/departments/', data),

  update: (id: number, data: Partial<DepartmentFormInput>): Promise<Department> =>
    apiPatch<Department>(`/departments/${id}/`, data),

  delete: (id: number): Promise<void> =>
    apiDelete(`/departments/${id}/`),
};
