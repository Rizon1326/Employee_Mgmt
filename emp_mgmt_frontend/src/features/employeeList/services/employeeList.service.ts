import type { Employee,Department, Country } from '../types/employeeList.ts';

import fetchList from '../../../api/apiClient.ts';



export const fetchEmployees = () => fetchList<Employee>('employees');

export const fetchDepartments = () => fetchList<Department>('departments');

export const fetchCountries = () => fetchList<Country>('countries');


