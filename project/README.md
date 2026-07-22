# Todo App (Node + React + Postgres + Docker)

Services:
- Backend: Node.js + Express (port 4000)
- Frontend: React + Vite (port 5173)
- Database: Postgres

Quick start (Docker):

```bash
# from project root
docker compose up --build
```

Open the frontend at http://localhost:5173

Backend API: http://localhost:4000/todos

Notes:
- The backend will create the `todos` table automatically on startup.
- If you prefer building the frontend for production, update the frontend Dockerfile to build and serve static files.
