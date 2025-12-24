# Employee Management System - API Endpoints Documentation

## Base URL
```
http://localhost:8000/api/
```

---

## 1. EMPLOYEES ENDPOINTS

### 1.1 GET /api/employees/
**Description:** Get all employees
**Method:** GET
**URL:** `http://localhost:8000/api/employees/`

**Demo Response:**
```json
[
  {
    "id": 1,
    "full_name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "date_of_birth": "1990-05-15",
    "date_joined": "2024-01-01",
    "department": {
      "id": 1,
      "name": "Engineering"
    },
    "role": {
      "id": 1,
      "name": "Software Developer",
      "department": {
        "id": 1,
        "name": "Engineering"
      }
    },
    "country": {
      "id": 1,
      "name": "United States"
    },
    "city": {
      "id": 1,
      "name": "New York",
      "country": {
        "id": 1,
        "name": "United States"
      }
    },
    "equipment_needed": [
      {
        "id": 1,
        "name": "Laptop"
      },
      {
        "id": 2,
        "name": "Mouse"
      }
    ],
    "work_days": [
      {
        "id": 1,
        "name": "Monday"
      },
      {
        "id": 2,
        "name": "Tuesday"
      },
      {
        "id": 3,
        "name": "Wednesday"
      },
      {
        "id": 4,
        "name": "Thursday"
      },
      {
        "id": 5,
        "name": "Friday"
      }
    ],
    "remote_work": true,
    "office_work": false,
    "employment_type": "full_time",
    "can_view_projects": true,
    "can_edit_projects": true,
    "can_delete_projects": false,
    "can_manage_employees": false,
    "can_approve_budget": false
  }
]
```

### 1.2 POST /api/employees/
**Description:** Create a new employee
**Method:** POST
**URL:** `http://localhost:8000/api/employees/`

**Request Body:**
```json
{
  "full_name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1987654321",
  "date_of_birth": "1992-03-22",
  "department_id": 2,
  "role_id": 3,
  "country_id": 1,
  "city_id": 2,
  "employment_type": "full_time",
  "remote_work": true,
  "office_work": false,
  "work_days_ids": [1, 2, 3, 4, 5],
  "equipment_needed_ids": [1, 3],
  "can_view_projects": true,
  "can_edit_projects": false,
  "can_delete_projects": false,
  "can_manage_employees": false,
  "can_approve_budget": false
}
```

**Demo Response:**
```json
{
  "id": 2,
  "full_name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1987654321",
  "date_of_birth": "1992-03-22",
  "date_joined": "2024-12-25",
  "department": {
    "id": 2,
    "name": "Marketing"
  },
  "role": {
    "id": 3,
    "name": "Marketing Manager",
    "department": {
      "id": 2,
      "name": "Marketing"
    }
  },
  "country": {
    "id": 1,
    "name": "United States"
  },
  "city": {
    "id": 2,
    "name": "Los Angeles",
    "country": {
      "id": 1,
      "name": "United States"
    }
  },
  "equipment_needed": [
    {
      "id": 1,
      "name": "Laptop"
    },
    {
      "id": 3,
      "name": "Headphones"
    }
  ],
  "work_days": [
    {
      "id": 1,
      "name": "Monday"
    },
    {
      "id": 2,
      "name": "Tuesday"
    },
    {
      "id": 3,
      "name": "Wednesday"
    },
    {
      "id": 4,
      "name": "Thursday"
    },
    {
      "id": 5,
      "name": "Friday"
    }
  ],
  "remote_work": true,
  "office_work": false,
  "employment_type": "full_time",
  "can_view_projects": true,
  "can_edit_projects": false,
  "can_delete_projects": false,
  "can_manage_employees": false,
  "can_approve_budget": false
}
```

### 1.3 GET /api/employees/{id}/
**Description:** Get specific employee by ID
**Method:** GET
**URL:** `http://localhost:8000/api/employees/1/`

**Demo Response:**
```json
{
  "id": 1,
  "full_name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "date_of_birth": "1990-05-15",
  "date_joined": "2024-01-01",
  "department": {
    "id": 1,
    "name": "Engineering"
  },
  "role": {
    "id": 1,
    "name": "Software Developer",
    "department": {
      "id": 1,
      "name": "Engineering"
    }
  },
  "country": {
    "id": 1,
    "name": "United States"
  },
  "city": {
    "id": 1,
    "name": "New York",
    "country": {
      "id": 1,
      "name": "United States"
    }
  },
  "equipment_needed": [
    {
      "id": 1,
      "name": "Laptop"
    },
    {
      "id": 2,
      "name": "Mouse"
    }
  ],
  "work_days": [
    {
      "id": 1,
      "name": "Monday"
    },
    {
      "id": 2,
      "name": "Tuesday"
    },
    {
      "id": 3,
      "name": "Wednesday"
    },
    {
      "id": 4,
      "name": "Thursday"
    },
    {
      "id": 5,
      "name": "Friday"
    }
  ],
  "remote_work": true,
  "office_work": false,
  "employment_type": "full_time",
  "can_view_projects": true,
  "can_edit_projects": true,
  "can_delete_projects": false,
  "can_manage_employees": false,
  "can_approve_budget": false
}
```

### 1.4 PUT /api/employees/{id}/
**Description:** Update entire employee record
**Method:** PUT
**URL:** `http://localhost:8000/api/employees/1/`

**Request Body:**
```json
{
  "full_name": "John Doe Updated",
  "email": "john.doe.updated@example.com",
  "phone": "+1234567890",
  "date_of_birth": "1990-05-15",
  "department_id": 1,
  "role_id": 1,
  "country_id": 1,
  "city_id": 1,
  "employment_type": "full_time",
  "remote_work": true,
  "office_work": false,
  "work_days_ids": [1, 2, 3, 4, 5],
  "equipment_needed_ids": [1, 2, 4],
  "can_view_projects": true,
  "can_edit_projects": true,
  "can_delete_projects": true,
  "can_manage_employees": true,
  "can_approve_budget": false
}
```

**Demo Response:**
```json
{
  "id": 1,
  "full_name": "John Doe Updated",
  "email": "john.doe.updated@example.com",
  "phone": "+1234567890",
  "date_of_birth": "1990-05-15",
  "date_joined": "2024-01-01",
  "department": {
    "id": 1,
    "name": "Engineering"
  },
  "role": {
    "id": 1,
    "name": "Software Developer",
    "department": {
      "id": 1,
      "name": "Engineering"
    }
  },
  "country": {
    "id": 1,
    "name": "United States"
  },
  "city": {
    "id": 1,
    "name": "New York",
    "country": {
      "id": 1,
      "name": "United States"
    }
  },
  "equipment_needed": [
    {
      "id": 1,
      "name": "Laptop"
    },
    {
      "id": 2,
      "name": "Mouse"
    },
    {
      "id": 4,
      "name": "Monitor"
    }
  ],
  "work_days": [
    {
      "id": 1,
      "name": "Monday"
    },
    {
      "id": 2,
      "name": "Tuesday"
    },
    {
      "id": 3,
      "name": "Wednesday"
    },
    {
      "id": 4,
      "name": "Thursday"
    },
    {
      "id": 5,
      "name": "Friday"
    }
  ],
  "remote_work": true,
  "office_work": false,
  "employment_type": "full_time",
  "can_view_projects": true,
  "can_edit_projects": true,
  "can_delete_projects": true,
  "can_manage_employees": true,
  "can_approve_budget": false
}
```

### 1.5 PATCH /api/employees/{id}/
**Description:** Partially update employee record
**Method:** PATCH
**URL:** `http://localhost:8000/api/employees/1/`

**Request Body:**
```json
{
  "full_name": "John Doe Final",
  "can_approve_budget": true
}
```

**Demo Response:**
```json
{
  "id": 1,
  "full_name": "John Doe Final",
  "email": "john.doe.updated@example.com",
  "phone": "+1234567890",
  "date_of_birth": "1990-05-15",
  "date_joined": "2024-01-01",
  "department": {
    "id": 1,
    "name": "Engineering"
  },
  "role": {
    "id": 1,
    "name": "Software Developer",
    "department": {
      "id": 1,
      "name": "Engineering"
    }
  },
  "country": {
    "id": 1,
    "name": "United States"
  },
  "city": {
    "id": 1,
    "name": "New York",
    "country": {
      "id": 1,
      "name": "United States"
    }
  },
  "equipment_needed": [
    {
      "id": 1,
      "name": "Laptop"
    },
    {
      "id": 2,
      "name": "Mouse"
    },
    {
      "id": 4,
      "name": "Monitor"
    }
  ],
  "work_days": [
    {
      "id": 1,
      "name": "Monday"
    },
    {
      "id": 2,
      "name": "Tuesday"
    },
    {
      "id": 3,
      "name": "Wednesday"
    },
    {
      "id": 4,
      "name": "Thursday"
    },
    {
      "id": 5,
      "name": "Friday"
    }
  ],
  "remote_work": true,
  "office_work": false,
  "employment_type": "full_time",
  "can_view_projects": true,
  "can_edit_projects": true,
  "can_delete_projects": true,
  "can_manage_employees": true,
  "can_approve_budget": true
}
```

### 1.6 DELETE /api/employees/{id}/
**Description:** Delete specific employee
**Method:** DELETE
**URL:** `http://localhost:8000/api/employees/1/`

**Demo Response:**
```json
{
  "status": "success",
  "message": "Employee deleted successfully"
}
```

---

## 2. DEPARTMENTS ENDPOINTS

### 2.1 GET /api/departments/
**Description:** Get all departments
**Method:** GET
**URL:** `http://localhost:8000/api/departments/`

**Demo Response:**
```json
[
  {
    "id": 1,
    "name": "Engineering"
  },
  {
    "id": 2,
    "name": "Marketing"
  },
  {
    "id": 3,
    "name": "Human Resources"
  },
  {
    "id": 4,
    "name": "Sales"
  }
]
```

### 2.2 POST /api/departments/
**Description:** Create a new department
**Method:** POST
**URL:** `http://localhost:8000/api/departments/`

**Request Body:**
```json
{
  "name": "Finance"
}
```

**Demo Response:**
```json
{
  "id": 5,
  "name": "Finance"
}
```

### 2.3 GET /api/departments/{id}/
**Description:** Get specific department by ID
**Method:** GET
**URL:** `http://localhost:8000/api/departments/1/`

**Demo Response:**
```json
{
  "id": 1,
  "name": "Engineering"
}
```

### 2.4 PUT /api/departments/{id}/
**Description:** Update department
**Method:** PUT
**URL:** `http://localhost:8000/api/departments/1/`

**Request Body:**
```json
{
  "name": "Software Engineering"
}
```

**Demo Response:**
```json
{
  "id": 1,
  "name": "Software Engineering"
}
```

### 2.5 DELETE /api/departments/{id}/
**Description:** Delete department
**Method:** DELETE
**URL:** `http://localhost:8000/api/departments/1/`

**Demo Response:**
```json
{
  "status": "success",
  "message": "Department deleted successfully"
}
```

---

## 3. ROLES ENDPOINTS

### 3.1 GET /api/roles/
**Description:** Get all roles
**Method:** GET
**URL:** `http://localhost:8000/api/roles/`

**Demo Response:**
```json
[
  {
    "id": 1,
    "name": "Software Developer",
    "department": {
      "id": 1,
      "name": "Engineering"
    }
  },
  {
    "id": 2,
    "name": "Senior Developer",
    "department": {
      "id": 1,
      "name": "Engineering"
    }
  },
  {
    "id": 3,
    "name": "Marketing Manager",
    "department": {
      "id": 2,
      "name": "Marketing"
    }
  }
]
```

### 3.2 POST /api/roles/
**Description:** Create a new role
**Method:** POST
**URL:** `http://localhost:8000/api/roles/`

**Request Body:**
```json
{
  "name": "Team Lead",
  "department": 1
}
```

**Demo Response:**
```json
{
  "id": 4,
  "name": "Team Lead",
  "department": {
    "id": 1,
    "name": "Engineering"
  }
}
```

### 3.3 GET /api/roles/{id}/
**Description:** Get specific role by ID
**Method:** GET
**URL:** `http://localhost:8000/api/roles/1/`

**Demo Response:**
```json
{
  "id": 1,
  "name": "Software Developer",
  "department": {
    "id": 1,
    "name": "Engineering"
  }
}
```

### 3.4 PUT /api/roles/{id}/
**Description:** Update role
**Method:** PUT
**URL:** `http://localhost:8000/api/roles/1/`

**Request Body:**
```json
{
  "name": "Senior Software Developer",
  "department": 1
}
```

**Demo Response:**
```json
{
  "id": 1,
  "name": "Senior Software Developer",
  "department": {
    "id": 1,
    "name": "Engineering"
  }
}
```

### 3.5 DELETE /api/roles/{id}/
**Description:** Delete role
**Method:** DELETE
**URL:** `http://localhost:8000/api/roles/1/`

**Demo Response:**
```json
{
  "status": "success",
  "message": "Role deleted successfully"
}
```

---

## 4. COUNTRIES ENDPOINTS

### 4.1 GET /api/countries/
**Description:** Get all countries
**Method:** GET
**URL:** `http://localhost:8000/api/countries/`

**Demo Response:**
```json
[
  {
    "id": 1,
    "name": "United States"
  },
  {
    "id": 2,
    "name": "Canada"
  },
  {
    "id": 3,
    "name": "Bangladesh"
  },
  {
    "id": 4,
    "name": "India"
  }
]
```

### 4.2 POST /api/countries/
**Description:** Create a new country
**Method:** POST
**URL:** `http://localhost:8000/api/countries/`

**Request Body:**
```json
{
  "name": "United Kingdom"
}
```

**Demo Response:**
```json
{
  "id": 5,
  "name": "United Kingdom"
}
```

### 4.3 GET /api/countries/{id}/
**Description:** Get specific country by ID
**Method:** GET
**URL:** `http://localhost:8000/api/countries/1/`

**Demo Response:**
```json
{
  "id": 1,
  "name": "United States"
}
```

### 4.4 PUT /api/countries/{id}/
**Description:** Update country
**Method:** PUT
**URL:** `http://localhost:8000/api/countries/1/`

**Request Body:**
```json
{
  "name": "United States of America"
}
```

**Demo Response:**
```json
{
  "id": 1,
  "name": "United States of America"
}
```

### 4.5 DELETE /api/countries/{id}/
**Description:** Delete country
**Method:** DELETE
**URL:** `http://localhost:8000/api/countries/1/`

**Demo Response:**
```json
{
  "status": "success",
  "message": "Country deleted successfully"
}
```

---

## 5. CITIES ENDPOINTS

### 5.1 GET /api/cities/
**Description:** Get all cities
**Method:** GET
**URL:** `http://localhost:8000/api/cities/`

**Demo Response:**
```json
[
  {
    "id": 1,
    "name": "New York",
    "country": {
      "id": 1,
      "name": "United States"
    }
  },
  {
    "id": 2,
    "name": "Los Angeles",
    "country": {
      "id": 1,
      "name": "United States"
    }
  },
  {
    "id": 3,
    "name": "Toronto",
    "country": {
      "id": 2,
      "name": "Canada"
    }
  },
  {
    "id": 4,
    "name": "Dhaka",
    "country": {
      "id": 3,
      "name": "Bangladesh"
    }
  }
]
```

### 5.2 POST /api/cities/
**Description:** Create a new city
**Method:** POST
**URL:** `http://localhost:8000/api/cities/`

**Request Body:**
```json
{
  "name": "Chittagong",
  "country_id": 3
}
```

**Demo Response:**
```json
{
  "id": 5,
  "name": "Chittagong",
  "country": {
    "id": 3,
    "name": "Bangladesh"
  }
}
```

### 5.3 GET /api/cities/{id}/
**Description:** Get specific city by ID
**Method:** GET
**URL:** `http://localhost:8000/api/cities/1/`

**Demo Response:**
```json
{
  "id": 1,
  "name": "New York",
  "country": {
    "id": 1,
    "name": "United States"
  }
}
```

### 5.4 PUT /api/cities/{id}/
**Description:** Update city
**Method:** PUT
**URL:** `http://localhost:8000/api/cities/1/`

**Request Body:**
```json
{
  "name": "New York City",
  "country_id": 1
}
```

**Demo Response:**
```json
{
  "id": 1,
  "name": "New York City",
  "country": {
    "id": 1,
    "name": "United States"
  }
}
```

### 5.5 DELETE /api/cities/{id}/
**Description:** Delete city
**Method:** DELETE
**URL:** `http://localhost:8000/api/cities/1/`

**Demo Response:**
```json
{
  "status": "success",
  "message": "City deleted successfully"
}
```

---

## 6. EQUIPMENT ENDPOINTS

### 6.1 GET /api/equipment/
**Description:** Get all equipment
**Method:** GET
**URL:** `http://localhost:8000/api/equipment/`

**Demo Response:**
```json
[
  {
    "id": 1,
    "name": "Laptop"
  },
  {
    "id": 2,
    "name": "Mouse"
  },
  {
    "id": 3,
    "name": "Headphones"
  },
  {
    "id": 4,
    "name": "Monitor"
  },
  {
    "id": 5,
    "name": "Keyboard"
  }
]
```

### 6.2 POST /api/equipment/
**Description:** Create new equipment
**Method:** POST
**URL:** `http://localhost:8000/api/equipment/`

**Request Body:**
```json
{
  "name": "Webcam"
}
```

**Demo Response:**
```json
{
  "id": 6,
  "name": "Webcam"
}
```

### 6.3 GET /api/equipment/{id}/
**Description:** Get specific equipment by ID
**Method:** GET
**URL:** `http://localhost:8000/api/equipment/1/`

**Demo Response:**
```json
{
  "id": 1,
  "name": "Laptop"
}
```

### 6.4 PUT /api/equipment/{id}/
**Description:** Update equipment
**Method:** PUT
**URL:** `http://localhost:8000/api/equipment/1/`

**Request Body:**
```json
{
  "name": "MacBook Pro"
}
```

**Demo Response:**
```json
{
  "id": 1,
  "name": "MacBook Pro"
}
```

### 6.5 DELETE /api/equipment/{id}/
**Description:** Delete equipment
**Method:** DELETE
**URL:** `http://localhost:8000/api/equipment/1/`

**Demo Response:**
```json
{
  "status": "success",
  "message": "Equipment deleted successfully"
}
```

---

## 7. WORK DAYS ENDPOINTS

### 7.1 GET /api/workdays/
**Description:** Get all work days
**Method:** GET
**URL:** `http://localhost:8000/api/workdays/`

**Demo Response:**
```json
[
  {
    "id": 1,
    "name": "Monday"
  },
  {
    "id": 2,
    "name": "Tuesday"
  },
  {
    "id": 3,
    "name": "Wednesday"
  },
  {
    "id": 4,
    "name": "Thursday"
  },
  {
    "id": 5,
    "name": "Friday"
  },
  {
    "id": 6,
    "name": "Saturday"
  },
  {
    "id": 7,
    "name": "Sunday"
  }
]
```

### 7.2 POST /api/workdays/
**Description:** Create new work day
**Method:** POST
**URL:** `http://localhost:8000/api/workdays/`

**Request Body:**
```json
{
  "name": "Holiday"
}
```

**Demo Response:**
```json
{
  "id": 8,
  "name": "Holiday"
}
```

### 7.3 GET /api/workdays/{id}/
**Description:** Get specific work day by ID
**Method:** GET
**URL:** `http://localhost:8000/api/workdays/1/`

**Demo Response:**
```json
{
  "id": 1,
  "name": "Monday"
}
```

### 7.4 PUT /api/workdays/{id}/
**Description:** Update work day
**Method:** PUT
**URL:** `http://localhost:8000/api/workdays/1/`

**Request Body:**
```json
{
  "name": "Monday Morning"
}
```

**Demo Response:**
```json
{
  "id": 1,
  "name": "Monday Morning"
}
```

### 7.5 DELETE /api/workdays/{id}/
**Description:** Delete work day
**Method:** DELETE
**URL:** `http://localhost:8000/api/workdays/1/`

**Demo Response:**
```json
{
  "status": "success",
  "message": "Work day deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid data provided",
  "details": {
    "field_name": ["This field is required."]
  }
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Employee not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Authentication
Currently, the API does not require authentication. All endpoints are publicly accessible.

## Content Type
All POST, PUT, and PATCH requests should include:
```
Content-Type: application/json
```

## CORS
The API supports Cross-Origin Resource Sharing (CORS) for frontend integration.
