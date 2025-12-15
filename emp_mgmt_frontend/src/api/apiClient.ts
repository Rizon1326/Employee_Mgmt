const BASE_URL = 'http://localhost:8000/api';

type PaginatedResponse<T> = {
  results: T[];
};

async function fetchList<T>(endpoint: string): Promise<T[]> {
  const res = await fetch(`${BASE_URL}/${endpoint}/`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const data: PaginatedResponse<T> | T[] = await res.json();

  if (Array.isArray(data)) {
    return data;
  }

  if ('results' in data && Array.isArray(data.results)) {
    return data.results;
  }

  console.error('Unexpected API response format:', data);
  return [];
}
export default fetchList;
