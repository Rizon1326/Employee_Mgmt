import type { Employee,Department, Country } from '../types/employeeList.ts';

const BASE_URL = 'http://localhost:8000/api';

export const fetchEmployees = async (): Promise<Employee[]> => {
  const res = await fetch(`${BASE_URL}/employees/`);

  if (!res.ok) {
    throw new Error('Failed to fetch employee list');
  }

  return res.json();
};

export const fetchDepartments = async (): Promise<Department[]> => {
  const res = await fetch(`${BASE_URL}/departments/`);

  if (!res.ok) {
    throw new Error('Failed to fetch Department');
  }

  return res.json();
};

export const fetchCountries = async (): Promise<Country[]> => {
  const res = await fetch(`${BASE_URL}/countries/`);

  if (!res.ok) {
    throw new Error('Failed to fetch Country');
  }

  return res.json();
};

