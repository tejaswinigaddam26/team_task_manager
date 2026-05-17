# Team Task Manager

A complete full-stack web application for managing team projects and tasks.

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Lucide Icons
- Recharts

**Backend:**
- Java Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- Maven
- Hibernate/JPA

## Features

- **JWT Authentication:** Secure login and signup system.
- **Role-Based Access:** 
  - **ADMIN:** Create/Delete projects, create tasks, assign tasks to members.
  - **MEMBER:** View assigned tasks and update task status.
- **Interactive Dashboard:** Stats and charts for project overview.
- **Task Management:** Kanban-style list view with priority and status tracking.
- **Modern UI:** Responsive design with dark mode and smooth transitions.

## Local Setup

### 1. Database
Create a MySQL database named `team_task_manager`.

### 2. Backend
1. Navigate to the `backend` folder.
2. Update `src/main/resources/application.properties` with your MySQL credentials.
3. Run: `mvn spring-boot:run`

### 3. Frontend
1. Navigate to the `frontend` folder.
2. Run: `npm install`
3. Run: `npm run dev`

## Deployment (Railway)

This project is ready to be deployed on [Railway](https://railway.app/).

1. Push the code to GitHub.
2. Create a new project on Railway from your GitHub repo.
3. Add a MySQL database service in Railway.
4. Set the following environment variables in the backend service:
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
   - `JWT_SECRET`
