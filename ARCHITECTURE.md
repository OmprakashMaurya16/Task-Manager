# ARCHITECTURE DOCUMENT

---

## 1. System Overview

This is a full-stack Task Management system built using the MERN stack.

The architecture follows a clear separation:

Client (React) → Express API → MongoDB Database

The frontend communicates with the backend via REST APIs secured with JWT authentication. The backend enforces business logic, validation, and RBAC rules.

---

## 2. Folder Structure

### Backend

- models/ → Mongoose schemas (User, Task)
- controllers/ → Business logic
- routes/ → Express routes
- middlewares/ → Auth middleware
- utils/ → Helper utilities (JWT, error handling, response formatting)
- scripts/ → Seed script
- config/ → Database connection

This structure separates concerns clearly and keeps business logic out of route files.

---

### Frontend

- api/ → Axios configuration & API abstraction
- components/ → Reusable UI components
- pages/ → Route-level components
- context/ → Authentication state management
- hooks/ → Custom hooks

This ensures UI logic, API calls, and state management remain modular.

---

## 3. Database Schema

### User Schema

- name: String (required)
- email: String (unique, lowercase)
- password: String (hashed, select: false)
- role: enum ('admin', 'member')
- timestamps

### Task Schema

- title: String
- description: String
- status: enum ('pending', 'in-progress', 'completed')
- dueDate: Date
- priority: enum ('low', 'medium', 'high')
- createdBy: ObjectId (ref User)
- assignedTo: ObjectId (ref User)
- timestamps

---

## 4. API Endpoints

### Auth

POST /api/auth/register  
POST /api/auth/login

### Tasks (Protected)

GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id

Query Parameters:

- status
- priority
- sortBy

---

## 5. Authentication Flow

1. User registers/logs in.
2. Server validates credentials.
3. Server generates JWT containing:
   - userId
   - role
4. Token returned to client.
5. Token stored in localStorage.
6. Axios interceptor attaches token in Authorization header.
7. Backend middleware verifies token and attaches req.user.
8. Controllers enforce RBAC logic.

---

## 6. AI Tools Used

- ChatGPT → Structure refinement, validation improvements, edge case handling
- Claude → Architecture reasoning
- Stitch → UI component scaffolding

All generated code was reviewed, refactored, and tested manually before final integration.

---

## 7. Decisions & Trade-offs

- Used localStorage for JWT instead of httpOnly cookies for simplicity.
- RBAC enforced at controller level instead of middleware decorators (since Express used).
- No pagination implemented due to scope control.
- Manual validation combined with Mongoose validation instead of express-validator to reduce complexity.

With more time:

- Add pagination
- Add refresh token strategy
- Improve error boundary handling
- Add unit tests
