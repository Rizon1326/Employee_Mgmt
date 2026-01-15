# Module Implementation Guide - React Query CRUD Pattern

## Overview
This guide demonstrates how to implement a complete CRUD module using React Query, TypeScript, and the existing API client pattern. Use this as a reference when building new features in the application.

## Sample Module: City Management
The City module serves as a reference implementation that includes:
- Fetching data with React Query
- Creating new records
- Updating existing records
- Deleting records
- Managing related entities (Cities belong to Countries)

---

## Architecture Pattern

### 1. **Folder Structure**
```
features/
  └── [featureName]/
      ├── components/
      │   └── [ComponentName].tsx
      ├── hooks/
      │   └── [featureName].ts
      ├── services/
      │   └── [featureName].service.ts
      └── types/
          └── [featureName].ts
```

### 2. **Implementation Layers**

#### **Layer 1: Types** (`types/[featureName].ts`)
Define TypeScript interfaces for:
- Main entity type (e.g., `City`)
- Related entities (e.g., `Country`)
- Create/Update DTOs (e.g., `CreateCity`)

**Example:**
```typescript
export type Country = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
  country: Country;
};

export type CreateCity = {
  name: string;
  country_id: number;
};
```

**Guidelines:**
- Use descriptive type names
- Separate read models from write models (DTO pattern)
- Include related entities when needed for display
- Use snake_case for backend field names (e.g., `country_id`)

---

#### **Layer 2: Services** (`services/[featureName].service.ts`)
Create service functions that use the centralized API client.

**Example:**
```typescript
import { fetchList, updateItem, deleteItem, createItem } from "../../../api/apiClient";
import type { City, CreateCity, Country } from "../types/citySettings";

export const fetchCities = async (): Promise<City[]> => {
  return fetchList<City>("cities");
};

export const fetchCountries = async (): Promise<Country[]> => {
  return fetchList<Country>("countries");
};

export const createCity = async (cityData: Partial<CreateCity>): Promise<CreateCity> => {
  return createItem<CreateCity>("cities", cityData);
};

export const updateCity = async (id: number, cityData: Partial<CreateCity>): Promise<CreateCity> => {
  return updateItem<CreateCity>("cities", id, cityData);
};

export const deleteCity = async (id: number): Promise<void> => {
  return deleteItem("cities", id);
};
```

**Guidelines:**
- Import generic CRUD functions from `apiClient.ts`
- Use consistent naming: `fetch[Entity]`, `create[Entity]`, `update[Entity]`, `delete[Entity]`
- Pass the endpoint string (e.g., "cities") matching your Django backend URL
- Use TypeScript generics for type safety
- Keep service functions thin - just API calls, no business logic

---

#### **Layer 3: Hooks** (`hooks/[featureName].ts`)
Create React Query hooks for data fetching and mutations.

**Example:**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCities, fetchCountries, updateCity, deleteCity, createCity } from '../services/citySettings.service';
import type { CreateCity } from '../types/citySettings';

// Query Hook for Fetching
export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });
};

// Mutation Hook for Creating
export const useCreateCity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (cityData: Partial<CreateCity>) => createCity(cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
    onError: (error) => {
      console.error('Error creating city:', error);
    },
  });
};

// Mutation Hook for Updating
export const useUpdateCity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, cityData }: { id: number; cityData: Partial<CreateCity> }) =>
      updateCity(id, cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
    onError: (error) => {
      console.error('Error updating city:', error);
    },
  });
};

// Mutation Hook for Deleting
export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteCity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
    onError: (error) => {
      console.error('Error deleting city:', error);
    },
  });
};
```

**Guidelines:**
- **Query Hooks** (`useQuery`): For GET requests
  - Use descriptive queryKey arrays (e.g., `['cities']`)
  - QueryKey is used for caching and invalidation
  
- **Mutation Hooks** (`useMutation`): For POST, PUT, DELETE requests
  - Always get `queryClient` via `useQueryClient()`
  - Invalidate relevant queries in `onSuccess` to refresh data
  - Handle errors in `onError` callback
  - For updates, accept both `id` and data payload
  - For creates, accept only data payload
  - For deletes, accept only `id`

---

#### **Layer 4: Components** (`components/[ComponentName].tsx`)

##### **Create Component**
Handles form input and submission for creating new records.

**Example:**
```typescript
import React, { useState } from "react";
import { useCountries, useCreateCity } from "../../hooks/citySettings";
import type { Country } from "../../types/citySettings";
import { Plus } from "lucide-react";

export const CreateCity = () => {
  const { data: countryData, isLoading, isError } = useCountries();
  const createCityMutation = useCreateCity();
  
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cityName, setCityName] = useState("");

  const handleCreateCity = async () => {
    if (!selectedCountry || !cityName.trim()) {
      alert("Please select a country and enter a city name");
      return;
    }

    try {
      await createCityMutation.mutateAsync({
        name: cityName.trim(),
        country_id: parseInt(selectedCountry)
      });
      
      setCityName("");
      setSelectedCountry("");
    } catch (error) {
      console.error("Failed to create city:", error);
      alert("Failed to create city. Please try again.");
    }
  };
  
  return (
    <div className="space-y-3">
      <select
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {!isLoading && !isError && countryData?.map((country: Country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="City name"
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateCity}
          disabled={createCityMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {createCityMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
```

##### **List Component**
Displays data with inline editing and deletion.

**Example:**
```typescript
import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useCities, useCountries, useUpdateCity, useDeleteCity } from "../../hooks/citySettings";

export const CityList = () => {
  const { data: countryData, isLoading: isCountryLoading, isError: isCountryError } = useCountries();
  const { data: cityData, isLoading: isCityLoading, isError: isCityError } = useCities();
  
  const updateCityMutation = useUpdateCity();
  const deleteCityMutation = useDeleteCity();

  const countries = countryData || [];
  const cities = cityData || [];

  const [editingCity, setEditingCity] = useState<{
    id: number;
    name: string;
    country: number | null;
  } | null>(null);

  const handleUpdateCity = async () => {
    if (editingCity && editingCity.name.trim() && editingCity.country) {
      try {
        await updateCityMutation.mutateAsync({
          id: editingCity.id,
          cityData: {
            name: editingCity.name,
            country_id: editingCity.country,
          },
        });
        setEditingCity(null);
      } catch (error) {
        console.error("Failed to update city:", error);
      }
    }
  };

  const handleDeleteCity = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteCityMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete city:", error);
      }
    }
  };

  if (isCountryLoading || isCityLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (isCountryError || isCityError) {
    return <div className="p-4 text-red-600">Error loading data</div>;
  }

  return (
    <div className="space-y-2">
      {cities.map((city) => (
        <div key={city.id}>
          {editingCity?.id === city.id ? (
            <div className="space-y-2">
              <div className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <span className="text-slate-500">
                  {countries.find((country) => country.id === editingCity.country)?.name}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editingCity.name}
                  onChange={(e) => setEditingCity({ ...editingCity, name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleUpdateCity}
                  disabled={updateCityMutation.isPending}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {updateCityMutation.isPending ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditingCity(null)}
                  className="px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <span className="text-slate-700">{city.name}</span>
                <p className="text-sm text-slate-500">{city.country?.name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingCity({
                    id: city.id,
                    name: city.name,
                    country: city.country?.id || 0,
                  })}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCity(city.id, city.name)}
                  disabled={deleteCityMutation.isPending}
                  className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

**Component Guidelines:**
- Handle loading and error states
- Use `mutateAsync` for async operations where you need to wait for completion
- Use `mutation.isPending` to show loading states on buttons
- Reset form state after successful creation
- Show confirmation dialogs before deletion
- Use inline editing pattern for better UX
- Disable buttons during pending operations

---

## API Client Reference

The centralized API client (`api/apiClient.ts`) provides these generic functions:

```typescript
// Fetch list of items (GET)
fetchList<T>(endpoint: string): Promise<T[]>

// Create new item (POST)
createItem<T>(endpoint: string, item: Partial<T>): Promise<T>

// Update existing item (PUT)
updateItem<T>(endpoint: string, id: number, item: Partial<T>): Promise<T>

// Delete item (DELETE)
deleteItem(endpoint: string, id: number): Promise<void>
```

**Usage:**
- Endpoint should match Django URL pattern (e.g., "cities", "employees", "departments")
- All functions handle JSON serialization and error responses
- Returns strongly-typed responses based on generic type parameter

---

## Checklist for New Module

When implementing a new CRUD module, follow this checklist:

### 1. Types Layer
- [ ] Define main entity type
- [ ] Define related entity types (if any)
- [ ] Create DTO types for create/update operations
- [ ] Export all types

### 2. Services Layer
- [ ] Import API client functions
- [ ] Implement `fetch[Entity]` for listing
- [ ] Implement `create[Entity]` for creation
- [ ] Implement `update[Entity]` for updates
- [ ] Implement `delete[Entity]` for deletion
- [ ] Add proper TypeScript generics

### 3. Hooks Layer
- [ ] Create query hook with `useQuery` for fetching
- [ ] Create mutation hook with `useMutation` for creation
- [ ] Create mutation hook with `useMutation` for updates
- [ ] Create mutation hook with `useMutation` for deletion
- [ ] Add `invalidateQueries` in `onSuccess` callbacks
- [ ] Add error handling in `onError` callbacks

### 4. Components Layer
- [ ] Create component for listing/displaying data
- [ ] Add loading and error state handling
- [ ] Implement inline editing UI
- [ ] Implement delete with confirmation
- [ ] Create component for creating new records
- [ ] Add form validation
- [ ] Reset form after successful submission
- [ ] Show pending states on buttons

### 5. Integration
- [ ] Import components in parent component
- [ ] Test create operation
- [ ] Test update operation
- [ ] Test delete operation
- [ ] Verify data refreshes after mutations

---

## Common Patterns & Best Practices

### 1. Error Handling
```typescript
const handleCreate = async () => {
  try {
    await createMutation.mutateAsync(data);
    // Success feedback
  } catch (error) {
    console.error("Failed:", error);
    alert("Operation failed. Please try again.");
  }
};
```

### 2. Form State Management
```typescript
const [formData, setFormData] = useState({ name: "", relatedId: "" });

// Reset after successful creation
const handleCreate = async () => {
  await createMutation.mutateAsync(formData);
  setFormData({ name: "", relatedId: "" }); // Reset
};
```

### 3. Optimistic Updates (Optional)
For better UX, update UI before backend confirms:
```typescript
const updateMutation = useMutation({
  mutationFn: updateItem,
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['items'] });
    
    // Snapshot previous value
    const previousData = queryClient.getQueryData(['items']);
    
    // Optimistically update
    queryClient.setQueryData(['items'], (old) => [...old, newData]);
    
    return { previousData };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['items'], context.previousData);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
  },
});
```

### 4. Dependent Dropdowns
When one field depends on another (like City depends on Country):
```typescript
const [country, setCountry] = useState("");
const { data: cities } = useCities(country); // Pass country as filter

// In UI
<select value={country} onChange={(e) => setCountry(e.target.value)}>
  {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
</select>
```

---

## Quick Start Template

Use this template to quickly scaffold a new module:

```bash
# 1. Create folder structure
features/[moduleName]/
  ├── components/
  ├── hooks/
  ├── services/
  └── types/

# 2. Create files
types/[moduleName].ts
services/[moduleName].service.ts
hooks/[moduleName].ts
components/[ModuleName]List.tsx
components/Create[ModuleName].tsx

# 3. Follow the implementation pattern shown above
```

---

## Related Resources

- **API Client**: `src/api/apiClient.ts`
- **React Query Setup**: `src/api/queryClient.ts`
- **Example Implementation**: `src/features/adminSettings/` (City/Country modules)
- **Django Backend**: Ensure your backend has corresponding REST API endpoints

---

## Notes

- This pattern scales well for complex applications
- React Query handles caching, background updates, and stale data automatically
- TypeScript ensures type safety across all layers
- The separation of concerns makes code maintainable and testable
- Always test CRUD operations in the order: Create → Read → Update → Delete

---

**Last Updated:** January 2026  
**Version:** 1.0
