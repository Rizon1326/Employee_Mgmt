import type { Employee,Department, Country } from '../types/employeeList.ts';

const BASE_URL = 'http://localhost:8000/api';

export const fetchEmployees = async (): Promise<Employee[]> => {
  const res = await fetch(`${BASE_URL}/employees/`);

  if (!res.ok) {
    throw new Error('Failed to fetch employee list');
  }

  const data = await res.json();
    if (data.results && Array.isArray(data.results)) {
    return data.results;
  }
  
  if (Array.isArray(data)) {
    return data;
  }
  
  console.error('Unexpected API response format:', data);
  return [];
};

export const fetchDepartments = async (): Promise<Department[]> => {
  const res = await fetch(`${BASE_URL}/departments/`);

  if (!res.ok) {
    throw new Error('Failed to fetch Department');
  }

  const data = await res.json();
  
  if (data.results && Array.isArray(data.results)) {
    return data.results;
  }
  
  if (Array.isArray(data)) {
    return data;
  }
  
  console.error('Unexpected API response format:', data);
  return [];
};

export const fetchCountries = async (): Promise<Country[]> => {
  const res = await fetch(`${BASE_URL}/countries/`);

  if (!res.ok) {
    throw new Error('Failed to fetch Country');
  }

  const data = await res.json();
  
  if (data.results && Array.isArray(data.results)) {
    return data.results;
  }
  
  if (Array.isArray(data)) {
    return data;
  }
  
  console.error('Unexpected API response format:', data);
  return [];
};

