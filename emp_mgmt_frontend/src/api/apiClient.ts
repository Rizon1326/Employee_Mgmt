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

async function updateItem<T>(endpoint: string, id: number, item: Partial<T>): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    throw new Error(`Failed to update item with id ${id} at ${endpoint}`);
  }

  return res.json();
}

async function deleteItem(endpoint: string, id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${endpoint}/${id}/`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete item with id ${id} at ${endpoint}`);
  }
}
async function createItem<T>(endpoint: string, item: Partial<T>): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    throw new Error(`Failed to create item at ${endpoint}`);
  }

  return res.json();
}

export { fetchList, updateItem, deleteItem, createItem };
