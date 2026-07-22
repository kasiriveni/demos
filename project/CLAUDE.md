# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small three-service TODO app, run together via Docker Compose:

- **backend/** — Node.js + Express + `pg`, exposing `/todos` (GET/POST/PUT/DELETE) on port 4000, backed by Postgres.
- **frontend/** — React 18 + Vite SPA, port 5173, talks to the backend at `VITE_API_URL` (defaults to `http://localhost:4000`).
- **db** — Postgres 15, credentials `todo/todo/todo`, data persisted in the `db-data` named volume.

## Common Commands

All commands run from the repo root unless noted.

```bash
# Full stack (recommended)
docker compose up --build        # db + backend on :4000, frontend on :5173
docker compose down              # stop; keeps the db-data volume
docker compose down -v           # stop AND wipe the db volume

# Backend (local, requires running Postgres with the creds above)
cd backend
npm install
npm start                        # node index.js; PORT/DB_* env vars override defaults

# Frontend (local)
cd frontend
npm install
npm run dev                      # Vite dev server, :5173
npm run build                    # production build to dist/
npm run preview                  # serve the build on :5173
```

There are **no tests, no linter, and no formatter** configured in this repo. If you add them, wire scripts into the respective `package.json`.

## Architecture

```
frontend (Vite/React, :5173)
    │  fetch(API + "/todos/...")
    ▼
backend (Express, :4000)  ──►  Postgres (:5432, "todo" DB)
    │
    └── db.js  ─►  node-postgres Pool
```

### Backend — `backend/index.js` + `backend/db.js`

- `db.js` exports a single `pg.Pool` wrapped in a `query(text, params)` helper. All env-driven config (host/port/user/pass/db) lives here — handlers don't touch the pool directly.
- `index.js` runs `init()` on startup which `CREATE TABLE IF NOT EXISTS todos` (id SERIAL PK, title TEXT, completed BOOL default FALSE, created_at TIMESTAMP default NOW()). Schema is owned by the backend, not migrations.
- Route shape: `GET /todos`, `POST /todos {title}`, `PUT /todos/:id {title?, completed?}` (uses `COALESCE` for partial updates), `DELETE /todos/:id` (returns 204).
- No middleware beyond `cors()` + `express.json()`. No auth, no validation library, no error middleware — keep additions consistent with that minimalism.

### Frontend — `frontend/src/`

- `main.jsx` mounts `<App />` into `#root` with `React.StrictMode`.
- `App.jsx` holds the only state (`todos`, `text`) and does all fetches inline — no `api.js`, no React Query, no routing.
- API base URL comes from `import.meta.env.VITE_API_URL` with a `http://localhost:4000` fallback. Set it via an `.env` file in `frontend/` or pass at Docker build time.
- Styling is a single hand-written `styles.css` (no Tailwind, no CSS modules). Component-level CSS goes in this file.
- After mutations, the UI updates locally from the response — there is no refetch on save.

## Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, etc.), imperative mood, lowercase subject, no trailing period, ≤50 chars. See `AGENTS.md` at the repo root for the full list of scopes/types.
- **File layout:** Keep backend and frontend code inside their respective directories; do not add a top-level `src/` or shared package unless intentionally introducing a monorepo.
- **Env vars:** Backend reads `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`. Frontend reads `VITE_API_URL` (build-time only).
- **`.gitignore`** covers `node_modules`, `.env`, and the `db-data` volume directory. Do not commit any of these.

## Things To Watch For

- The backend listens on **4000**, not 3000 — the parent `CLAUDE.md` in `C:\Users\Yuva\Desktop\AI\` describes a different project on port 3000. Use this file when working inside `project/`.
- `backend/package.json` has only a `start` script; there is no `dev` script with nodemon. Run via Docker or `node --watch index.js` for auto-reload.
- `DELETE /todos/:id` returns 204 with an empty body — the frontend relies on this; don't switch it to return JSON without updating `remove()` in `App.jsx`.
- `PUT /todos/:id` uses `COALESCE`, so omitted fields are preserved. A `null` value, however, would overwrite the column with `null` — be deliberate about what the client sends.
- The frontend Dockerfile runs `npm run dev` (Vite dev server), not a built artifact. For production, change it to `npm run build` and serve `dist/` via a static server.
