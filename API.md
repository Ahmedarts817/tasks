# API Documentation — tasks

Base URL: https://gawasa-todo.onrender.com/api/tasks

Common headers

- Content-Type: application/json

---

## Models

User

- name: string (required, min 2, max 100)
- email: string (required, used to check uniqueness)
- password: string (required, min 6)
- role: string (optional)
- createdAt, updatedAt (timestamps)

Task

- title: string (required)
- description: string (optional)
- createdAt, updatedAt (timestamps)

---

## Endpoints

### Create a user

- Method: POST
- Path: /api/users
- Body (JSON):
  {
  "name": "Alice",
  "email": "alice@example.com",
  "password": "s3cret",
  "role": "user"
  }
- Success: 201 Created
  {
  "message": "✅ User created successfully",
  "user": { /_ user document _/ }
  }
- Errors:
  - 400 if email already exists: { message: "User already exists" }
  - 500 on server error

---

### List users

- Method: GET
- Path: /api/users
- Success: 200 OK
  [ { /* user objects */ } ]
- Errors: 500

---

### Create a task

- Method: POST
- Path: /api/tasks
- Body (JSON):
  { "title": "Buy groceries", "description": "Milk, eggs" }
- Success: 201 Created
  {
  "message": "✅ Task created successfully",
  "task": { /_ task document _/ }
  }
- Errors:
  - 400 if title missing: { message: "Title is required" }
  - 500 on server error

---

### List tasks

- Method: GET
- Path: /api/tasks
- Success: 200 OK
  [ { /* task objects */ } ]
- Errors: 500

---

### Get single task

- Method: GET
- Path: /api/tasks/:id
- Success: 200 OK
  { /_ task object _/ }
- Errors:
  - 404 if not found: { message: "Task not found" }
  - 500 on server error

---

### Update a task

- Method: PUT
- Path: /api/tasks/:id
- Body (JSON): { "title": "New title", "description": "New description" }
- Success: 200 OK
  { message: "✅ Task updated successfully", task: { /_ updated doc _/ } }
- Errors:
  - 404 if not found
  - 500 on server error

---

### Delete a task

- Method: DELETE
- Path: /api/tasks/:id
- Success: 200 OK
  { message: "🗑️ Task deleted successfully" }
- Errors:
  - 404 if not found
  - 500 on server error

---

### Delete all tasks

- Method: DELETE
- Path: /api/tasks
- Success: 200 OK
  { message: "🗑️ Deleted N task(s) successfully" }
- Errors: 500

---

## Errors

- 400: Bad request (validation)
- 404: Not found
- 500: Server error
