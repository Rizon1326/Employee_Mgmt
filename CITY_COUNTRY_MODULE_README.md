# City / Country Module - CRUD Implementation Guide

## 📋 Overview

This module provides a complete CRUD (Create, Read, Update, Delete) implementation for managing **Cities** and **Countries** in a React application. It demonstrates a clean, scalable architecture using **React Query (TanStack Query)** for efficient data fetching, caching, and state management.

The module serves as a **reusable template** that can be easily adapted for other entities like departments, roles, equipment, categories, etc.

---

## 🛠️ Tech Stack

- **React** (with Vite)
- **TypeScript**
- **React Query (TanStack Query)** - Data fetching and caching
- **Axios / Fetch API** - HTTP client
- **REST API** - Backend integration

---

## 📁 Recommended Folder Structure

```
src/
├── api/
│   ├── apiClient.ts              # Base API client (fetch/axios wrapper)
│   └── queryClient.ts            # React Query client configuration
│
├── features/
│   └── adminSettings/
│       ├── components/
│       │   ├── cities/
│       │   │   ├── CityList.tsx
│       │   │   ├── CityForm.tsx
│       │   │   └── CityModal.tsx
│       │   └── countries/
│       │       ├── CountryList.tsx
│       │       ├── CountryForm.tsx
│       │       └── CountryModal.tsx
│       │
│       ├── hooks/
│       │   ├── citySettings.ts       # React Query hooks for cities
│       │   └── countrySettings.ts    # React Query hooks for countries
│       │
│       ├── services/
│       │   ├── citySettings.service.ts    # API calls for cities
│       │   └── countrySettings.service.ts # API calls for countries
│       │
│       └── types/
│           ├── citySettings.ts       # TypeScript types for cities
│           └── countrySettings.ts    # TypeScript types for countries
│
└── App.tsx
```

---

## 🔌 API Integration Approach

### 1. Base API Client (`apiClient.ts`)

Create reusable functions for all HTTP operations:

```typescript
const BASE_URL = 'http://localhost:8000/api';

type PaginatedResponse<T> = {
  results: T[];
};

// Generic function to fetch list of items
async function fetchList<T>(endpoint: string): Promise<T[]> {
  const res = await fetch(`${BASE_URL}/${endpoint}/`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  
  const data: PaginatedResponse<T> | T[] = await res.json();
  
  // Handle both paginated and non-paginated responses
  if (Array.isArray(data)) {
    return data;
  }
  
  if ('results' in data && Array.isArray(data.results)) {
    return data.results;
  }
  
  return [];
}

// Create new item
async function createItem<T>(endpoint: string, item: Partial<T>): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  
  if (!res.ok) {
    throw new Error(`Failed to create item at ${endpoint}`);
  }
  
  return res.json();
}

// Update existing item
async function updateItem<T>(endpoint: string, id: number, item: Partial<T>): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}/${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  
  if (!res.ok) {
    throw new Error(`Failed to update item with id ${id}`);
  }
  
  return res.json();
}

// Delete item
async function deleteItem(endpoint: string, id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${endpoint}/${id}/`, {
    method: 'DELETE',
  });
  
  if (!res.ok) {
    throw new Error(`Failed to delete item with id ${id}`);
  }
}

export { fetchList, createItem, updateItem, deleteItem };
```

---

### 2. Service Layer (`citySettings.service.ts`)

Wrap API client with entity-specific functions:

```typescript
import { fetchList, createItem, updateItem, deleteItem } from '@/api/apiClient';
import { City } from '../types/citySettings';

const ENDPOINT = 'cities';

export const cityService = {
  // Fetch all cities
  fetchCities: () => fetchList<City>(ENDPOINT),
  
  // Create new city
  createCity: (city: Partial<City>) => createItem<City>(ENDPOINT, city),
  
  // Update existing city
  updateCity: (id: number, city: Partial<City>) => updateItem<City>(ENDPOINT, id, city),
  
  // Delete city
  deleteCity: (id: number) => deleteItem(ENDPOINT, id),
};
```

---

### 3. TypeScript Types (`citySettings.ts`)

```typescript
export interface City {
  id: number;
  name: string;
  country: number;  // Foreign key to country
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Country {
  id: number;
  name: string;
  code?: string;
  is_active?: boolean;
}
```

---

## ⚡ React Query Usage

### 1. Custom Hooks (`hooks/citySettings.ts`)

React Query hooks encapsulate all data fetching logic:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cityService } from '../services/citySettings.service';
import { City } from '../types/citySettings';

// Query Keys - centralized for easy cache management
export const cityKeys = {
  all: ['cities'] as const,
  lists: () => [...cityKeys.all, 'list'] as const,
  list: (filters: string) => [...cityKeys.lists(), { filters }] as const,
  details: () => [...cityKeys.all, 'detail'] as const,
  detail: (id: number) => [...cityKeys.details(), id] as const,
};

// ✅ FETCH: Get all cities
export function useCities() {
  return useQuery({
    queryKey: cityKeys.lists(),
    queryFn: cityService.fetchCities,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000,   // Cache for 10 minutes (was cacheTime)
  });
}

// ✅ CREATE: Add new city
export function useCreateCity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newCity: Partial<City>) => cityService.createCity(newCity),
    onSuccess: () => {
      // Invalidate and refetch cities list
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to create city:', error);
    },
  });
}

// ✅ UPDATE: Edit existing city
export function useUpdateCity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<City> }) =>
      cityService.updateCity(id, data),
    onSuccess: () => {
      // Invalidate queries to refresh the list
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update city:', error);
    },
  });
}

// ✅ DELETE: Remove city
export function useDeleteCity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => cityService.deleteCity(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete city:', error);
    },
  });
}
```

---

## 🔄 CRUD Flow - Step by Step

### **Step 1: Fetch Data (READ)**

```typescript
function CityList() {
  const { data: cities, isLoading, error } = useCities();
  
  if (isLoading) return <div>Loading cities...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {cities?.map((city) => (
        <li key={city.id}>{city.name}</li>
      ))}
    </ul>
  );
}
```

**What happens:**
1. Component mounts → React Query checks cache
2. If cache is fresh → returns cached data immediately
3. If stale or missing → fetches from API
4. Updates component with data

---

### **Step 2: Create New Item (CREATE)**

```typescript
function CityForm() {
  const createCity = useCreateCity();
  const [name, setName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createCity.mutate(
      { name },
      {
        onSuccess: () => {
          setName(''); // Clear form
          alert('City created successfully!');
        },
      }
    );
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="City name"
      />
      <button type="submit" disabled={createCity.isPending}>
        {createCity.isPending ? 'Creating...' : 'Create City'}
      </button>
      {createCity.error && <p>Error: {createCity.error.message}</p>}
    </form>
  );
}
```

**What happens:**
1. User submits form
2. `mutate()` sends POST request
3. On success → React Query invalidates `cities` cache
4. List automatically refetches and updates

---

### **Step 3: Update Existing Item (UPDATE)**

```typescript
function CityEditForm({ city }: { city: City }) {
  const updateCity = useUpdateCity();
  const [name, setName] = useState(city.name);
  
  const handleUpdate = () => {
    updateCity.mutate(
      { id: city.id, data: { name } },
      {
        onSuccess: () => {
          alert('City updated successfully!');
        },
      }
    );
  };
  
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleUpdate} disabled={updateCity.isPending}>
        {updateCity.isPending ? 'Updating...' : 'Update'}
      </button>
    </div>
  );
}
```

---

### **Step 4: Delete Item (DELETE)**

```typescript
function CityItem({ city }: { city: City }) {
  const deleteCity = useDeleteCity();
  
  const handleDelete = () => {
    if (confirm(`Delete ${city.name}?`)) {
      deleteCity.mutate(city.id, {
        onSuccess: () => {
          alert('City deleted successfully!');
        },
      });
    }
  };
  
  return (
    <div>
      <span>{city.name}</span>
      <button onClick={handleDelete} disabled={deleteCity.isPending}>
        {deleteCity.isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
```

---

## 🔁 How to Reuse for Other Entities

This module is designed to be a **template**. Here's how to adapt it for other entities:

### Example: Creating a "Department" Module

1. **Create Types** (`types/departmentSettings.ts`):
   ```typescript
   export interface Department {
     id: number;
     name: string;
     code: string;
     is_active: boolean;
   }
   ```

2. **Create Service** (`services/departmentSettings.service.ts`):
   ```typescript
   import { fetchList, createItem, updateItem, deleteItem } from '@/api/apiClient';
   import { Department } from '../types/departmentSettings';
   
   const ENDPOINT = 'departments';
   
   export const departmentService = {
     fetchDepartments: () => fetchList<Department>(ENDPOINT),
     createDepartment: (dept: Partial<Department>) => createItem<Department>(ENDPOINT, dept),
     updateDepartment: (id: number, dept: Partial<Department>) => 
       updateItem<Department>(ENDPOINT, id, dept),
     deleteDepartment: (id: number) => deleteItem(ENDPOINT, id),
   };
   ```

3. **Create Hooks** (`hooks/departmentSettings.ts`):
   ```typescript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { departmentService } from '../services/departmentSettings.service';
   
   export const departmentKeys = {
     all: ['departments'] as const,
     lists: () => [...departmentKeys.all, 'list'] as const,
   };
   
   export function useDepartments() {
     return useQuery({
       queryKey: departmentKeys.lists(),
       queryFn: departmentService.fetchDepartments,
     });
   }
   
   export function useCreateDepartment() {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: departmentService.createDepartment,
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: departmentKeys.lists() });
       },
     });
   }
   
   // ... useUpdateDepartment, useDeleteDepartment
   ```

4. **Create Components** (`components/departments/DepartmentList.tsx`):
   ```typescript
   function DepartmentList() {
     const { data: departments, isLoading } = useDepartments();
     // ... render logic
   }
   ```

---

## ✅ Best Practices

### 1. **Centralize Query Keys**
```typescript
// ✅ Good - Easy to manage and invalidate
export const cityKeys = {
  all: ['cities'] as const,
  lists: () => [...cityKeys.all, 'list'] as const,
  detail: (id: number) => [...cityKeys.all, id] as const,
};

// ❌ Bad - Hard to track and invalidate
useQuery({ queryKey: ['cities'], ... });
useQuery({ queryKey: ['city-list'], ... });
```

### 2. **Use TypeScript**
Always define types for your data to catch errors early.

### 3. **Handle Loading and Error States**
```typescript
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
```

### 4. **Optimistic Updates (Advanced)**
For better UX, update UI immediately before API responds:
```typescript
const updateCity = useMutation({
  mutationFn: cityService.updateCity,
  onMutate: async (newCity) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries({ queryKey: cityKeys.lists() });
    
    // Snapshot previous value
    const previous = queryClient.getQueryData(cityKeys.lists());
    
    // Optimistically update
    queryClient.setQueryData(cityKeys.lists(), (old: City[]) =>
      old.map((city) => (city.id === newCity.id ? { ...city, ...newCity.data } : city))
    );
    
    return { previous };
  },
  onError: (err, newCity, context) => {
    // Rollback on error
    queryClient.setQueryData(cityKeys.lists(), context?.previous);
  },
});
```

### 5. **Avoid Over-fetching**
Use `staleTime` to reduce unnecessary API calls:
```typescript
useQuery({
  queryKey: cityKeys.lists(),
  queryFn: cityService.fetchCities,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

---

## ⚠️ Common Mistakes

### 1. **Not Invalidating Queries After Mutations**
```typescript
// ❌ Bad - List won't update after creating
useMutation({ mutationFn: cityService.createCity });

// ✅ Good - List refetches automatically
useMutation({
  mutationFn: cityService.createCity,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
  },
});
```

### 2. **Forgetting Error Handling**
```typescript
// ❌ Bad - Errors go unnoticed
const { data } = useCities();

// ✅ Good - Show errors to user
const { data, error } = useCities();
if (error) return <Alert>{error.message}</Alert>;
```

### 3. **Using Wrong HTTP Methods**
- `GET` → Read
- `POST` → Create
- `PUT/PATCH` → Update
- `DELETE` → Delete

### 4. **Not Using Loading States**
Always disable buttons during mutations:
```typescript
<button disabled={createCity.isPending}>
  {createCity.isPending ? 'Creating...' : 'Create'}
</button>
```

---

## 🚀 Future Improvements

1. **Pagination Support**
   - Add `page` and `limit` parameters
   - Implement infinite scroll with `useInfiniteQuery`

2. **Search and Filtering**
   ```typescript
   export function useCities(filters?: { search: string; country?: number }) {
     return useQuery({
       queryKey: cityKeys.list(JSON.stringify(filters)),
       queryFn: () => cityService.fetchCities(filters),
     });
   }
   ```

3. **Form Validation**
   - Integrate `react-hook-form` or `formik`
   - Add Zod/Yup schema validation

4. **Toast Notifications**
   - Replace alerts with toast library (e.g., `react-hot-toast`)

5. **Permission-Based UI**
   - Show/hide create/edit/delete based on user roles

6. **Bulk Operations**
   - Select multiple items
   - Bulk delete or update

7. **Export to CSV/Excel**
   - Allow users to download data

8. **Audit Logs**
   - Track who created/updated/deleted items

---

## 📚 Additional Resources

- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
- [TypeScript with React Query](https://tanstack.com/query/latest/docs/react/typescript)

---

## 📝 Summary

This module demonstrates:
- ✅ Clean separation of concerns (types, services, hooks, components)
- ✅ React Query for efficient data management
- ✅ TypeScript for type safety
- ✅ Reusable architecture
- ✅ Best practices and error handling

Use this as a foundation for all your CRUD modules!

---

**Happy Coding! 🎉**
