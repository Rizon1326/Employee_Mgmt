# Postman Testing Guide for Employee Management API

## Server Information
- **Server URL:** `http://127.0.0.1:8000`
- **API Base URL:** `http://127.0.0.1:8000/api/`

> **Important:** Use `127.0.0.1:8000` instead of `localhost:8000` to avoid any DNS resolution issues.

---

## Quick Test Endpoints

### 1. Test Countries API

#### 1.1 GET All Countries
- **Method:** `GET`
- **URL:** `http://127.0.0.1:8000/api/countries/`
- **Headers:** None required
- **Body:** None

#### 1.2 Create New Country
- **Method:** `POST`
- **URL:** `http://127.0.0.1:8000/api/countries/`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Brazil"
  }
  ```

#### 1.3 Get Specific Country
- **Method:** `GET`
- **URL:** `http://127.0.0.1:8000/api/countries/1/`
- **Headers:** None required
- **Body:** None

#### 1.4 Update Country
- **Method:** `PUT`
- **URL:** `http://127.0.0.1:8000/api/countries/1/`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Brazil Updated"
  }
  ```

#### 1.5 Delete Country
- **Method:** `DELETE`
- **URL:** `http://127.0.0.1:8000/api/countries/1/`
- **Headers:** None required
- **Body:** None

---

### 2. Test Cities API

#### 2.1 GET All Cities
- **Method:** `GET`
- **URL:** `http://127.0.0.1:8000/api/cities/`

#### 2.2 Create New City
- **Method:** `POST`
- **URL:** `http://127.0.0.1:8000/api/cities/`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "São Paulo",
    "country_id": 1
  }
  ```

---

### 3. Test Departments API

#### 3.1 GET All Departments
- **Method:** `GET`
- **URL:** `http://127.0.0.1:8000/api/departments/`

#### 3.2 Create New Department
- **Method:** `POST`
- **URL:** `http://127.0.0.1:8000/api/departments/`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Engineering"
  }
  ```

---

### 4. Test Roles API

#### 4.1 GET All Roles
- **Method:** `GET`
- **URL:** `http://127.0.0.1:8000/api/roles/`

#### 4.2 Create New Role
- **Method:** `POST`
- **URL:** `http://127.0.0.1:8000/api/roles/`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Software Developer",
    "department": 1
  }
  ```

---

### 5. Test Equipment API

#### 5.1 GET All Equipment
- **Method:** `GET`
- **URL:** `http://127.0.0.1:8000/api/equipment/`

#### 5.2 Create New Equipment
- **Method:** `POST`
- **URL:** `http://127.0.0.1:8000/api/equipment/`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Laptop"
  }
  ```

---

### 6. Test Work Days API

#### 6.1 GET All Work Days
- **Method:** `GET`
- **URL:** `http://127.0.0.1:8000/api/workdays/`

#### 6.2 Create New Work Day
- **Method:** `POST`
- **URL:** `http://127.0.0.1:8000/api/workdays/`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "name": "Monday"
  }
  ```

---

### 7. Test Employee API

#### 7.1 GET All Employees
- **Method:** `GET`
- **URL:** `http://127.0.0.1:8000/api/employees/`

#### 7.2 Create New Employee (Complex Example)
- **Method:** `POST`
- **URL:** `http://127.0.0.1:8000/api/employees/`
- **Headers:** 
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
  ```json
  {
    "full_name": "John Doe",
    "email": "john.doe@example.com",
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
    "equipment_needed_ids": [1],
    "can_view_projects": true,
    "can_edit_projects": false,
    "can_delete_projects": false,
    "can_manage_employees": false,
    "can_approve_budget": false
  }
  ```

---

## Troubleshooting Steps

### If you get "Connection Refused" error:
1. Make sure Django server is running: `python3 manage.py runserver 8000`
2. Use `127.0.0.1:8000` instead of `localhost:8000`
3. Check if port 8000 is available

### If you get "404 Not Found" error:
1. Verify the URL path is correct
2. Make sure `/api/` is included in the URL
3. Check the endpoint exists in `employees/urls.py`

### If you get "405 Method Not Allowed" error:
1. Check if you're using the correct HTTP method (GET, POST, PUT, DELETE)
2. Verify the endpoint supports that method

### If you get "400 Bad Request" with validation errors:
1. Check the JSON format in the request body
2. Verify all required fields are included
3. Make sure `Content-Type: application/json` header is set
4. Check for typos in field names

### If you get CORS errors (in browser/frontend):
1. This usually happens when testing from a web browser
2. Use Postman or curl instead for API testing
3. Or add CORS middleware to Django settings

---

## Testing Order Recommendation

Test in this order to ensure dependencies are met:

1. **First:** Test Countries API (no dependencies)
2. **Second:** Test Departments API (no dependencies)
3. **Third:** Test Equipment API (no dependencies)
4. **Fourth:** Test Work Days API (no dependencies)
5. **Fifth:** Test Cities API (depends on countries)
6. **Sixth:** Test Roles API (depends on departments)
7. **Finally:** Test Employee API (depends on all above)

---

## Sample cURL Commands

If you prefer command line testing:

### Create Country:
```bash
curl -X POST http://127.0.0.1:8000/api/countries/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Brazil"}'
```

### Get All Countries:
```bash
curl -X GET http://127.0.0.1:8000/api/countries/
```

### Create Department:
```bash
curl -X POST http://127.0.0.1:8000/api/departments/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Engineering"}'
```
