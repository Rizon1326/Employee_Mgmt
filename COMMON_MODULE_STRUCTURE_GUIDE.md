# Common Module Structure Guide

এই গাইডটি আপনাকে দেখাবে কিভাবে `components`, `hooks`, `services`, `types`, এবং `apiClient.ts` ব্যবহার করে একটি সম্পূর্ণ নতুন মডিউল তৈরি করবেন।

## 📁 Module Structure Overview

প্রতিটি মডিউলের নিম্নলিখিত ফোল্ডার স্ট্রাকচার থাকবে:

```
features/
  └── yourModule/
      ├── components/       # UI Components
      ├── hooks/           # Custom React Hooks
      ├── services/        # API Service Functions
      └── types/           # TypeScript Type Definitions
```

## 🔄 Data Flow Architecture

```
User Interaction → Component → Hook → Service → apiClient.ts → Backend API
                        ↑                                            ↓
                        └────────── Response Data ──────────────────┘
```

---

## 📝 Step-by-Step Guide: Creating a New Module

আসুন একটি উদাহরণ দিয়ে শিখি। ধরুন আমরা একটি **"Projects"** মডিউল তৈরি করবো।

---

## Step 1: Define Types (types/)

**File: `features/projects/types/project.ts`**

```typescript
// Define the main entity type
export type Project = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed' | 'on-hold';
  created_at: string;
  updated_at: string;
};

// Define form input type (without auto-generated fields)
export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

// Define filter type (optional)
export type ProjectFilters = {
  status?: string;
  search?: string;
};
```

**💡 Key Points:**
- `Project`: সম্পূর্ণ entity definition
- `ProjectInput`: Create/Update এর জন্য (id, created_at, updated_at বাদ দিয়ে)
- Filter types: যদি filtering প্রয়োজন হয়

---

## Step 2: Create Service Layer (services/)

**File: `features/projects/services/project.service.ts`**

```typescript
import { fetchList, createItem, updateItem, deleteItem } from '@/api/apiClient';
import { Project, ProjectInput } from '../types/project';

// Service layer - API calls এর জন্য
export const projectService = {
  // Fetch all projects
  getAll: () => fetchList<Project>('projects'),

  // Create new project
  create: (project: ProjectInput) => createItem<Project>('projects', project),

  // Update existing project
  update: (id: number, project: Partial<ProjectInput>) => 
    updateItem<Project>('projects', id, project),

  // Delete project
  delete: (id: number) => deleteItem('projects', id),
};
```

**💡 Key Points:**
- `apiClient.ts` থেকে generic functions import করুন
- Endpoint name ('projects') হবে backend API endpoint
- Service functions শুধুমাত্র API calls handle করে

---

## Step 3: Create Custom Hook (hooks/)

**File: `features/projects/hooks/useProjects.ts`**

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project.service';
import { ProjectInput } from '../types/project';

export const useProjects = () => {
  const queryClient = useQueryClient();

  // Fetch all projects
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll,
  });

  // Create project mutation
  const createProject = useMutation({
    mutationFn: projectService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // Update project mutation
  const updateProject = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProjectInput> }) =>
      projectService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // Delete project mutation
  const deleteProject = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
  };
};
```

**💡 Key Points:**
- React Query ব্যবহার করে data fetching এবং caching
- `useQuery`: Data fetch করার জন্য
- `useMutation`: Create, Update, Delete operations এর জন্য
- `invalidateQueries`: Data update হলে cache refresh করার জন্য

---

## Step 4: Create Components (components/)

### A. Main Component

**File: `features/projects/components/ProjectList.tsx`**

```typescript
import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types/project';

export const ProjectList: React.FC = () => {
  const { projects, isLoading, deleteProject } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Projects</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.status}</td>
              <td>{project.start_date}</td>
              <td>
                <button onClick={() => setSelectedProject(project)}>
                  Edit
                </button>
                <button onClick={() => deleteProject.mutate(project.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

### B. Form Component

**File: `features/projects/components/ProjectForm.tsx`**

```typescript
import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { ProjectInput } from '../types/project';

type Props = {
  projectToEdit?: Project | null;
  onClose: () => void;
};

export const ProjectForm: React.FC<Props> = ({ projectToEdit, onClose }) => {
  const { createProject, updateProject } = useProjects();
  
  const [formData, setFormData] = useState<ProjectInput>({
    name: projectToEdit?.name || '',
    description: projectToEdit?.description || '',
    start_date: projectToEdit?.start_date || '',
    end_date: projectToEdit?.end_date || '',
    status: projectToEdit?.status || 'active',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (projectToEdit) {
      await updateProject.mutateAsync({
        id: projectToEdit.id,
        data: formData,
      });
    } else {
      await createProject.mutateAsync(formData);
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Project Name"
        required
      />
      {/* Add more fields... */}
      <button type="submit">
        {projectToEdit ? 'Update' : 'Create'}
      </button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};
```

---

## 🔧 Understanding apiClient.ts

`apiClient.ts` এ চারটি generic functions আছে:

### 1. **fetchList<T>** - List/All items fetch করার জন্য

```typescript
// Usage in service
getAll: () => fetchList<Project>('projects')

// What it does:
// GET http://localhost:8000/api/projects/
```

### 2. **createItem<T>** - নতুন item create করার জন্য

```typescript
// Usage in service
create: (project: ProjectInput) => createItem<Project>('projects', project)

// What it does:
// POST http://localhost:8000/api/projects/
// Body: { name: "...", description: "..." }
```

### 3. **updateItem<T>** - Existing item update করার জন্য

```typescript
// Usage in service
update: (id: number, project: Partial<ProjectInput>) => 
  updateItem<Project>('projects', id, project)

// What it does:
// PUT http://localhost:8000/api/projects/5/
// Body: { name: "Updated Name" }
```

### 4. **deleteItem** - Item delete করার জন্য

```typescript
// Usage in service
delete: (id: number) => deleteItem('projects', id)

// What it does:
// DELETE http://localhost:8000/api/projects/5/
```

---

## 🎯 Complete Example: Department Module

এখানে Department মডিউলের সম্পূর্ণ উদাহরণ দেওয়া হলো:

### types/department.ts
```typescript
export type Department = {
  id: number;
  name: string;
  description: string;
  created_at: string;
};

export type DepartmentInput = Omit<Department, 'id' | 'created_at'>;
```

### services/department.service.ts
```typescript
import { fetchList, createItem, updateItem, deleteItem } from '@/api/apiClient';
import { Department, DepartmentInput } from '../types/department';

export const departmentService = {
  getAll: () => fetchList<Department>('departments'),
  create: (dept: DepartmentInput) => createItem<Department>('departments', dept),
  update: (id: number, dept: Partial<DepartmentInput>) => 
    updateItem<Department>('departments', id, dept),
  delete: (id: number) => deleteItem('departments', id),
};
```

### hooks/useDepartments.ts
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentService } from '../services/department.service';

export const useDepartments = () => {
  const queryClient = useQueryClient();

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: departmentService.getAll,
  });

  const createDepartment = useMutation({
    mutationFn: departmentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const updateDepartment = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<DepartmentInput> }) =>
      departmentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  const deleteDepartment = useMutation({
    mutationFn: departmentService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });

  return {
    departments,
    isLoading,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
};
```

### components/DepartmentManager.tsx
```typescript
import React from 'react';
import { useDepartments } from '../hooks/useDepartments';

export const DepartmentManager: React.FC = () => {
  const { 
    departments, 
    isLoading, 
    createDepartment, 
    deleteDepartment 
  } = useDepartments();

  const handleCreate = () => {
    createDepartment.mutate({
      name: 'New Department',
      description: 'Description here',
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Departments</h2>
      <button onClick={handleCreate}>Add Department</button>
      <ul>
        {departments.map((dept) => (
          <li key={dept.id}>
            {dept.name}
            <button onClick={() => deleteDepartment.mutate(dept.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

## 📋 Quick Checklist for New Module

নতুন মডিউল তৈরি করার সময় এই checklist follow করুন:

- [ ] **Step 1**: `types/` folder এ type definitions তৈরি করুন
  - Main entity type
  - Input type (without id, timestamps)
  - Filter types (if needed)

- [ ] **Step 2**: `services/` folder এ service file তৈরি করুন
  - `apiClient.ts` থেকে functions import করুন
  - Service object তৈরি করুন (getAll, create, update, delete)

- [ ] **Step 3**: `hooks/` folder এ custom hook তৈরি করুন
  - `useQuery` for fetching
  - `useMutation` for create/update/delete
  - Return necessary data and functions

- [ ] **Step 4**: `components/` folder এ React components তৈরি করুন
  - Main list/table component
  - Form component (create/edit)
  - Use the custom hook for data management

---

## 🎨 Best Practices

### 1. **Naming Conventions**
```
- Types: PascalCase (Project, Department)
- Services: camelCase with 'Service' suffix (projectService)
- Hooks: camelCase with 'use' prefix (useProjects)
- Components: PascalCase (ProjectList, ProjectForm)
```

### 2. **File Organization**
```
✅ Good:
features/projects/types/project.ts
features/projects/services/project.service.ts

❌ Bad:
features/projects/projectTypes.ts
features/projects/projectService.ts
```

### 3. **Type Safety**
```typescript
// Always use TypeScript generics
fetchList<Project>('projects')  // ✅
fetchList('projects')            // ❌
```

### 4. **Error Handling**
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: projectService.getAll,
});

if (error) {
  return <div>Error: {error.message}</div>;
}
```

---

## 🚀 Quick Start Template

নতুন মডিউল তৈরি করতে এই commands গুলো run করুন:

```bash
# Replace 'yourmodule' with your actual module name
cd emp_mgmt_frontend/src/features
mkdir -p yourmodule/{components,hooks,services,types}
touch yourmodule/types/yourmodule.ts
touch yourmodule/services/yourmodule.service.ts
touch yourmodule/hooks/useYourModule.ts
touch yourmodule/components/YourModuleManager.tsx
```

---

## 🔗 Integration with Backend

আপনার Django backend এ corresponding endpoint থাকতে হবে:

```python
# urls.py
urlpatterns = [
    path('api/projects/', ProjectListCreateView.as_view()),
    path('api/projects/<int:pk>/', ProjectDetailView.as_view()),
]
```

Endpoint name যেটা service layer এ ব্যবহার করেছেন সেটা match করতে হবে।

---

## 📚 Related Files to Reference

- **City & Country Module**: `features/adminSettings/` - Complete working example
- **apiClient.ts**: `src/api/apiClient.ts` - Generic API functions
- **Query Client Setup**: `src/api/queryClient.ts` - React Query configuration

---

## ❓ Common Issues & Solutions

### Issue 1: "Failed to fetch" error
**Solution**: Check if backend endpoint matches the service endpoint name

### Issue 2: Data not refreshing after mutation
**Solution**: Ensure `invalidateQueries` is called in mutation's `onSuccess`

### Issue 3: TypeScript errors in components
**Solution**: Verify type definitions match backend response structure

---

## 📞 Need Help?

এই structure অনুসরণ করে আপনি যেকোনো নতুন মডিউল তৈরি করতে পারবেন। সব module এ একই pattern follow করুন consistency এর জন্য।

Happy Coding! 🎉
