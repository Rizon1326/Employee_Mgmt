# GitHub Copilot Prompt for Module Implementation README

Use this prompt when you want to create a comprehensive README for your React + React Query CRUD modules:

---

## The Prompt:

```
Please create a comprehensive README documentation file that explains the implementation pattern used in this codebase for CRUD operations with React Query.

**Context:**
- This is a React + TypeScript application
- We use React Query (TanStack Query) for data fetching and mutations
- We have a centralized API client at `src/api/apiClient.ts` with generic functions: fetchList, createItem, updateItem, deleteItem
- The backend is Django REST Framework
- We follow a layered architecture: Types → Services → Hooks → Components

**Reference Module:**
Use the [City/Country/Department/etc.] module as the example implementation. The module is located at:
`src/features/adminSettings/[moduleName]/`

**Required Sections:**

1. **Overview**: Brief introduction to the pattern and what it includes

2. **Architecture Pattern**:
   - Folder structure diagram
   - Explanation of each layer (Types, Services, Hooks, Components)

3. **Implementation Layers** (with code examples from the reference module):
   - **Types Layer**: How to define entity types, DTOs, and related entities
   - **Services Layer**: How to create service functions using the API client
   - **Hooks Layer**: How to create React Query hooks (useQuery for GET, useMutation for POST/PUT/DELETE)
   - **Components Layer**: How to build Create and List components with inline editing

4. **API Client Reference**: Document the available generic functions and their usage

5. **Implementation Checklist**: A step-by-step checklist for implementing a new module

6. **Common Patterns & Best Practices**:
   - Error handling
   - Form state management
   - Optimistic updates (optional)
   - Dependent dropdowns
   - Loading states

7. **Quick Start Template**: A template structure for scaffolding new modules

8. **Related Resources**: Links to key files in the codebase

**Guidelines:**
- Include actual code examples from the reference module
- Make it practical and copy-paste friendly
- Use clear section headings and formatting
- Include TypeScript type definitions
- Show both Create and List/Edit/Delete patterns
- Explain React Query concepts (queryKey, invalidateQueries, mutateAsync, isPending)
- Add a checklist that developers can follow
- Keep it concise but comprehensive

The goal is that any developer can use this README to implement a new CRUD module following the same pattern without needing to ask questions.
```

---

## How to Use This Prompt:

1. **Open the file** where you want the README to be created (or create a new file)

2. **Select the reference module** in your code (e.g., open files from `src/features/adminSettings/cities/`)

3. **Copy this prompt** and paste it into GitHub Copilot Chat

4. **Customize the prompt** by:
   - Replacing `[City/Country/Department/etc.]` with your actual reference module name
   - Updating the file paths if your structure is different
   - Adding any specific patterns or conventions unique to your project

5. **Review and edit** the generated README to match your project's specific needs

---

## Tips for Better Results:

- Have the reference module files open in VS Code so Copilot has context
- Be specific about which module to use as reference
- Mention any specific technologies or libraries you use (e.g., Tailwind CSS, specific UI libraries)
- Include information about your backend API structure if it differs from standard REST
- Ask for specific sections if you don't need the full README

---

## Example Usage:

```
@workspace Please create a comprehensive README documentation file that explains the implementation pattern used in this codebase for CRUD operations with React Query.

**Context:**
- This is a React + TypeScript application
- We use React Query (TanStack Query) for data fetching and mutations
- We have a centralized API client at `src/api/apiClient.ts` with generic functions: fetchList, createItem, updateItem, deleteItem
- The backend is Django REST Framework
- We follow a layered architecture: Types → Services → Hooks → Components

**Reference Module:**
Use the City module as the example implementation. The module is located at:
`src/features/adminSettings/cities/`

[Rest of the prompt...]
```

---

## Alternative: Shorter Prompt

If you want a more concise prompt:

```
Create a comprehensive module implementation guide README based on the City/Country CRUD implementation in `src/features/adminSettings/`. 

The README should explain:
1. The layered architecture (Types → Services → Hooks → Components)
2. How to use React Query for CRUD operations
3. The API client pattern
4. Step-by-step implementation checklist
5. Code examples for each layer
6. Best practices and common patterns

Include actual code examples from the City module showing how to implement fetch, create, update, and delete operations. Make it practical so developers can copy this pattern for new modules.
```

---

## Maintenance:

Update this prompt template when:
- Your architecture pattern changes
- You adopt new libraries or patterns
- You want to emphasize different aspects
- Your team identifies common pain points that should be addressed in the documentation

---

**Version:** 1.0  
**Last Updated:** January 2026
