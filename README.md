# Task Manager

A full-stack task management application that allows teams to create, assign, and track tasks with role-based access control. Built with a **React** frontend and a **Node.js / Express** REST API backed by **MongoDB**.

---

## Technologies Used

### Backend

| Technology            | Purpose                  |
| --------------------- | ------------------------ |
| Node.js + Express v5  | REST API server          |
| MongoDB + Mongoose    | Database & ODM           |
| JSON Web Tokens (JWT) | Stateless authentication |
| bcrypt                | Password hashing         |
| express-validator     | Request validation       |
| dotenv                | Environment variables    |
| nodemon               | Dev auto-restart         |

### Frontend

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| React 19            | UI library              |
| Vite 7              | Build tool & dev server |
| Tailwind CSS v4     | Utility-first styling   |
| React Router DOM v7 | Client-side routing     |
| Axios               | HTTP client             |
| Lucide React        | Icon library            |

---

## Features

- **Authentication** — Register and log in with JWT-based sessions; tokens are sent via `Authorization` header.
- **Protected Routes** — Unauthenticated users are redirected to the login page automatically.
- **Task CRUD** — Create, view, edit, and delete tasks from the dashboard.
- **Task Fields** — Each task has a title, description, status (`pending` / `in-progress` / `completed`), priority (`low` / `medium` / `high`), due date, and optional assignee.
- **Filtering** — Filter the task list by status and priority in real time.
- **Dashboard Stats** — Summary cards showing task counts by status at a glance.
- **Role-based Access** — Only users with the `admin` role can assign tasks to other users.
- **Seed Script** — Populate the database with sample data for quick testing.

---

## File Structure

```
Task Manager/
├── Backend/
│   ├── package.json
│   └── src/
│       ├── app.js                  # Express app setup, CORS, routes
│       ├── index.js                # Server entry point
│       ├── config/
│       │   └── db.js               # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js  # Register & login logic
│       │   └── task.controller.js  # Task CRUD logic
│       ├── middlewares/
│       │   └── auth.middleware.js  # JWT verification
│       ├── models/
│       │   ├── user.model.js       # User schema
│       │   └── task.model.js       # Task schema
│       ├── routes/
│       │   ├── auth.routes.js      # POST /api/auth/register|login
│       │   └── task.routes.js      # GET|POST|PUT|DELETE /api/tasks
│       ├── scripts/
│       │   └── seed.js             # Database seeder
│       └── utils/
│           ├── api.error.js        # Custom error class
│           ├── async.handler.js    # Async wrapper
│           ├── response.helper.js  # Standardised response format
│           └── token.util.js       # JWT helpers
│
└── Frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx                 # Router setup
        ├── main.jsx                # React entry point
        ├── api/
        │   ├── axios.js            # Axios instance with base URL & interceptors
        │   └── task.api.js         # Task API calls
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.jsx
        │   │   └── ProtectedRoute.jsx
        │   └── tasks/
        │       ├── TaskFilters.jsx
        │       ├── TaskForm.jsx
        │       ├── TaskRow.jsx
        │       └── TaskTable.jsx
        ├── context/
        │   ├── AuthContext.js
        │   └── AuthProvider.jsx
        ├── hooks/
        │   └── useAuth.js
        └── pages/
            ├── Dashboard.jsx
            ├── Login.jsx
            └── Register.jsx
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

---

### 1. Clone the repository

```bash
git clone https://github.com/OmprakashMaurya16/Task-Manager.git
cd Task-Manager
```

---

### 2. Set up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_super_secret_key
CORS_ORIGIN=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

> **Optional:** Seed the database with sample data:
>
> ```bash
> npm run seed
> ```

---

### 3. Set up the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Create a `.env` file inside the `Frontend/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

The app will be available at `http://localhost:5173`.

---

## API Endpoints

| Method   | Endpoint             | Auth | Description                                        |
| -------- | -------------------- | ---- | -------------------------------------------------- |
| `POST`   | `/api/auth/register` | No   | Create a new account                               |
| `POST`   | `/api/auth/login`    | No   | Log in and receive a JWT                           |
| `GET`    | `/api/tasks`         | Yes  | Get all tasks (supports `?status=` & `?priority=`) |
| `POST`   | `/api/tasks`         | Yes  | Create a new task                                  |
| `PUT`    | `/api/tasks/:id`     | Yes  | Update a task                                      |
| `DELETE` | `/api/tasks/:id`     | Yes  | Delete a task                                      |

---
