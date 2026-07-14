# Todo REST API

Minimal TODO REST API using Node.js and Express. Data is stored in-memory (ephemeral).

Quick start

```bash
cd BE
npm install
npm run dev    # requires nodemon (dev)
npm start      # run production
```

API endpoints

- `GET /todos` — list all todos
- `GET /todos/:id` — get a specific todo
- `POST /todos` — create a todo, JSON body: `{ "title": "Task", "description": "..." }`
- `PUT /todos/:id` — update a todo (title, description, completed)
- `DELETE /todos/:id` — delete a todo

Notes

- This is intentionally simple and uses an in-memory array. For production, plug in a database.

Docker

- Build image locally:

```bash
cd BE
docker build -t todo-api:latest .
```

- Run with Docker:

```bash
docker run --rm -p 3000:3000 -v "$PWD/data":/usr/src/app/data -e PORT=3000 todo-api:latest
```

- Or run with docker-compose:

```bash
cd BE
docker-compose up --build
```

CI/CD

- A GitHub Actions workflow is included at `.github/workflows/docker-publish.yml` that builds and pushes the image to Docker Hub. Set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets in the repository settings before enabling the workflow.
