# Project Structure & Navigation Skill

**Description:** Understand the full-stack TODO app architecture—where code lives, how components connect, and how to navigate the codebase.

**Use when:**
- Onboarding to the project
- Tracing features end-to-end (backend → frontend → UI)
- Understanding how data flows
- Finding where to make changes
- Mapping dependencies between services
- Explaining architecture to team members

## Project Overview

Full-stack TODO management system with:
- **Backend:** Express.js REST API
- **Frontend:** React + Vite SPA
- **Agent Website:** Vanilla JS + Vite
- **CLI Tools:** Shell script examples

## Folder Structure

```
c:/Users/Yuva/Desktop/AI/
├── backend/                    # Express.js TODO API
│   ├── index.js               # Server entry
│   ├── routes/                # API endpoints (todos, jokes, tips)
│   ├── __tests__/             # Jest tests
│   ├── data/todos.json        # In-memory store
│   └── docker-compose.yml     # Multi-container config
│
├── frontend/                  # React + Vite + Tailwind
│   ├── src/
│   │   ├── App.jsx           # Main component
│   │   ├── api.js            # API integration
│   │   └── components/       # React components
│   ├── tailwind.config.cjs    # Styling config
│   └── vite.config.js        # Build config
│
├── agent-website/            # Vanilla JS + Vite
│   ├── js/features/          # Feature modules
│   ├── assets/css/           # Styling
│   ├── vitest.config.js      # Test config
│   └── coverage/             # Test reports
│
├── claude-cli-website/       # CLI tool examples
│   └── examples/
│       ├── code-reviewer.sh
│       ├── doc-generator.sh
│       ├── git-commit-helper.sh
│       └── ...
│
├── docs/                     # Documentation
├── CLAUDE.md                 # Project standup (key reference!)
├── AGENTS.md                 # Available agents
└── README.md
```

## Key Files by Purpose

### API & Backend
- `backend/index.js` - Server setup, middleware
- `backend/routes/todos.js` - Todo CRUD endpoints
- `backend/routes/jokes.js`, `tips.js` - Utility endpoints
- `backend/data/todos.json` - Data storage

### Frontend Components
- `frontend/src/App.jsx` - State, main logic
- `frontend/src/components/TodoList.jsx` - Display todos
- `frontend/src/components/TodoItem.jsx` - Single todo UI
- `frontend/src/components/InputForm.jsx` - New todo form
- `frontend/src/api.js` - API wrapper (fetch)

### Configuration
- `frontend/tailwind.config.cjs` - Tailwind classes
- `frontend/postcss.config.cjs` - CSS processing
- `backend/Dockerfile` - Container setup
- `backend/docker-compose.yml` - Multi-service orchestration

### Testing & Coverage
- `backend/__tests__/todos.test.js` - Jest tests
- `backend/coverage/` - Jest reports
- `agent-website/vitest.config.js` - Vitest setup
- `agent-website/coverage/` - Coverage reports

## Data Flow (TODO Creation Example)

```
1. User types in React InputForm (frontend/src/components/InputForm.jsx)
2. Form submits → api.js calls POST /api/todos (frontend/src/api.js)
3. Backend route handler (backend/routes/todos.js) receives request
4. Todo created and saved to data/todos.json (backend/data/todos.json)
5. Response sent back to React
6. App.jsx state updates via setTodos() (frontend/src/App.jsx)
7. TodoList re-renders with new todo (frontend/src/components/TodoList.jsx)
```

## Server Ports

| Service | Port | Start Command |
|---------|------|---|
| Backend | 3000 | `cd backend && npm run dev` |
| Frontend | 5173 | `cd frontend && npm run dev` |
| Agent Website | 5173* | `cd agent-website && npm run serve` |

*Different Vite instance, accessible from separate terminal

## Running the Full Stack

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Agent Website
cd agent-website && npm run serve

# Access in browser:
# Frontend: http://localhost:5173
# Backend: http://localhost:3000/api/todos
```

## Navigation Tips

### Find where "todos" are used
Use grep: `grep -r "todos" --include="*.js" --include="*.jsx"`

### Trace API endpoint
1. Find route: `backend/routes/todos.js`
2. See what it returns
3. Check frontend call: `frontend/src/api.js` and `App.jsx`

### Add a new feature
1. Create backend endpoint (backend/routes/)
2. Add API wrapper (frontend/src/api.js)
3. Create React component (frontend/src/components/)
4. Update App.jsx to use it
5. Test with npm test

## Important References
- **CLAUDE.md** - Full project documentation
- **AGENTS.md** - Available agents for tasks
- **backend/README.md** - Backend specific docs
- **frontend/README.md** - Frontend specific docs

## Project Conventions

### Commits
Follow Conventional Commits:
- `feat(frontend): add filter dropdown`
- `fix(api): validate todo ID`
- `docs(readme): update setup`

### Folder Structure
- Keep components in `components/`
- Keep routes in `routes/`
- Keep tests in `__tests__/` or `.test.js` pattern
- Use feature-based organization

### Naming
- React components: PascalCase (TodoList.jsx)
- Functions: camelCase (getTodos)
- Constants: UPPER_SNAKE_CASE (API_BASE_URL)
