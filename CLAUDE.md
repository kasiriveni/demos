# Project Standup

## Project Overview
A full-stack application featuring a TODO management system with multiple client interfaces and supporting utilities.

**Tech Stack:**
- **Backend:** Express.js (Node.js) with RESTful API
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Agent Website:** Vanilla JS with Vite (for CI/CD, automation features)
- **Testing:** Jest (backend), Vitest (agent-website)
- **Deployment:** Docker support

---

## Project Structure

### 🖥️ **Backend** (`/backend`)
Express.js TODO REST API with in-memory storage and comprehensive test coverage.

**Key Files:**
- `index.js` - Main server entry point
- `routes/` - API endpoints (todos, jokes, tips)
- `__tests__/` - Jest test suite
- `docker-compose.yml`, `Dockerfile` - Containerization

**Scripts:**
- `npm start` - Production server
- `npm run dev` - Development with nodemon
- `npm test` - Run tests
- `npm run coverage` - Generate coverage report

**Dependencies:**
- express@^5.2.1
- uuid@^14.0.1
- cors@^2.8.6

---

### ⚛️ **Frontend** (`/frontend`)
React application built with Vite and styled with Tailwind CSS.

**Key Files:**
- `src/main.jsx` - Entry point
- `src/App.jsx` - Main component
- `src/components/` - React components (Button, Header, Footer, TodoList, etc.)
- `src/api.js` - API integration layer
- `tailwind.config.cjs` - Tailwind configuration

**Scripts:**
- `npm run dev` - Development server (Vite)
- `npm run build` - Production build
- `npm start` - Start dev server

**Dependencies:**
- react@18.2.0
- react-dom@18.2.0
- vite@^4.2.1
- tailwindcss@^4.3.1

---

### 🌐 **Agent Website** (`/agent-website`)
Dedicated website for AI agents with feature modules and test coverage.

**Key Files:**
- `js/` - Feature modules (animations, content, easter-egg, navigation, projects)
- `assets/css/` - Styling (base, components, utilities)
- `docs/` - Documentation
- `coverage/` - Test coverage reports
- `vitest.config.js` - Vitest configuration

**Scripts:**
- `npm start` / `npm run serve` - Development server
- `npm run build` - Production build
- `npm run test` - Run tests with coverage
- `npm run test:watch` - Watch mode testing
- `npm run hooks:install` - Install git hooks

**Test Coverage:** Run `npm run test` to see detailed coverage

---

### 🛠️ **CLI Tools** (`/claude-cli-website`)
Command-line utilities and examples for Claude integration.

**Included Examples:**
- `code-reviewer.sh` - Code review automation
- `doc-generator.sh` - Documentation generation
- `git-commit-helper.sh` - Git commit assistance
- `log-analyzer.sh` - Log analysis
- `sql-optimizer.sh` - SQL query optimization
- `translator.sh` - Translation utility

---

### 📚 **Documentation** (`/docs`)
- `agent.md` - Agent configuration docs
- `github.md` - GitHub integration guide
- `README.md` - Main documentation

---

## Quick Start

### Prerequisites
- Node.js (v18+)
- npm/yarn

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev  # Starts on default port (check index.js)
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Starts Vite dev server
```

### 3. Agent Website Setup
```bash
cd agent-website
npm install
npm run serve  # Start dev server
npm run test   # Run tests
```

### 4. Run All Services
In separate terminals:
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Agent Website
cd agent-website && npm run serve
```

---

## Testing

### Backend Tests
```bash
cd backend
npm test              # Run Jest tests
npm run coverage      # Generate coverage report
```

### Agent Website Tests
```bash
cd agent-website
npm run test          # Run Vitest with coverage
npm run test:watch    # Watch mode
```

---

## Docker Deployment

### Backend Container
```bash
cd backend
docker build -t todo-api .
docker run -p 3000:3000 todo-api
```

### Using Docker Compose
```bash
docker-compose up
```

---

## API Endpoints

**Base URL:** `http://localhost:3000` (or configured port)

### TODOs
- `GET /api/todos` - Get all TODOs
- `POST /api/todos` - Create new TODO
- `PUT /api/todos/:id` - Update TODO
- `DELETE /api/todos/:id` - Delete TODO

### Other Routes
- `GET /api/jokes` - Get random joke
- `GET /api/tips` - Get tips

---

## Key Features

✅ Full-stack TODO management system
✅ Responsive React frontend with Tailwind CSS
✅ RESTful Express backend with CORS support
✅ Comprehensive test coverage (Jest + Vitest)
✅ Docker containerization
✅ CI/CD automation features
✅ Accessible components & semantic HTML

---

## 📋 CLI Tools & Automation

### Available Claude CLI Examples

#### 1. **Code Reviewer** (`code-reviewer.sh`)
Automated code quality analysis and review.

**Usage:**
```bash
./examples/code-reviewer.sh <file>
```

**Features:**
- Performance issue detection
- Security vulnerability scanning
- Code style analysis
- Bug identification
- Improvement suggestions

**Example:**
```bash
./examples/code-reviewer.sh backend/routes/todos.js
# Reviews the todos route handler for quality issues
```

---

#### 2. **Documentation Generator** (`doc-generator.sh`)
Automatically generate professional documentation from code.

**Usage:**
```bash
./examples/doc-generator.sh <file> [output_file]
```

**Features:**
- Function documentation
- Usage examples
- Parameter descriptions
- Returns markdown formatted docs

**Example:**
```bash
./examples/doc-generator.sh frontend/src/api.js > API_DOCS.md
# Generates API documentation file
```

---

#### 3. **Git Commit Helper** (`git-commit-helper.sh`)
Generate meaningful commit messages from staged changes.

**Usage:**
```bash
# Stage changes first
git add .
# Then run the script
./examples/git-commit-helper.sh
```

**Example Workflow:**
```bash
git add backend/routes/todos.js
./examples/git-commit-helper.sh
# Output: "feat(todos): add error handling for invalid todo IDs"
```

---

#### 4. **SQL Optimizer** (`sql-optimizer.sh`)
Optimize and analyze SQL queries for performance.

**Usage:**
```bash
./examples/sql-optimizer.sh query.sql
```

**Features:**
- Performance optimization
- Index suggestions
- Query refactoring
- Execution plan analysis

---

#### 5. **Log Analyzer** (`log-analyzer.sh`)
Analyze application logs for errors, patterns, and issues.

**Usage:**
```bash
./examples/log-analyzer.sh <logfile>
```

**Features:**
- Error pattern detection
- Performance metrics
- Issue categorization
- Actionable recommendations

---

#### 6. **Translator** (`translator.sh`)
Translate documentation and code comments between languages.

**Usage:**
```bash
./examples/translator.sh <file> <target_language>
```

**Example:**
```bash
./examples/translator.sh docs/README.md spanish
# Translates README to Spanish
```

---

## � Conventional Commit Messages

All commits follow the **Conventional Commits** specification for consistent, readable history.

### Commit Format
```
<type>(<scope>): <subject>

<optional body>
<optional footer>
```

### Commit Types

| Type | Usage | Example |
|------|-------|---------|
| `feat` | New feature | `feat(todos): add filter by status` |
| `fix` | Bug fix | `fix(api): validate todo ID` |
| `docs` | Documentation | `docs(readme): update setup guide` |
| `style` | Code formatting | `style(frontend): format components` |
| `refactor` | Code refactoring | `refactor(backend): simplify validation` |
| `perf` | Performance improvement | `perf(api): optimize query` |
| `test` | Add/update tests | `test(todos): add unit tests` |
| `ci` | CI/CD changes | `ci(github): add test workflow` |
| `chore` | Dependencies, build | `chore(deps): upgrade React` |
| `revert` | Revert previous commit | `revert: undo feat(todos)` |

### Project Scopes

- `backend` - Express.js API
- `frontend` - React application
- `agent-website` - Agent website
- `cli` - CLI tools
- `docker` - Container configuration
- `deps` - Dependencies
- `api` - API endpoints
- `auth` - Authentication
- `ui` - User interface

### Examples

**Feature:**
```bash
git commit -m "feat(frontend): add dark mode toggle"
git commit -m "feat(api): implement user authentication"
```

**Bug Fix:**
```bash
git commit -m "fix(todos): prevent duplicate IDs on creation"
git commit -m "fix(ui): resolve button alignment issue"
```

**Documentation:**
```bash
git commit -m "docs(readme): add Docker deployment steps"
git commit -m "docs(api): document JWT validation endpoint"
```

**Dependencies:**
```bash
git commit -m "chore(deps): upgrade Vite to 4.2.1"
git commit -m "chore(deps): install axios@1.6.0"
```

### Auto-Generate Commits

Use the git-commit-helper script:

```bash
# Stage your changes
git add .

# Generate conventional commit message
cd claude-cli-website/examples
./git-commit-helper.sh

# Copy and use the generated message
git commit -m "feat(scope): generated message"
```

### Rules

✅ **Use imperative mood:** "add feature" (not "added feature")
✅ **Lowercase subject:** "add feature" (not "Add feature")
✅ **No period at end:** "add feature" (not "add feature.")
✅ **Maximum 50 chars:** Keep subject line concise
✅ **Be specific:** "fix null reference in todo" (not "fix bug")

---

## �🔧 Development Workflow

### Local Development Setup
```bash
# 1. Install all dependencies
cd backend && npm install
cd ../frontend && npm install
cd ../agent-website && npm install

# 2. Start services in parallel terminals
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Agent Website
cd agent-website && npm run serve
```

### Making Changes

**Backend Changes:**
```bash
# Edit routes or index.js
# nodemon automatically restarts on changes
# Test with: npm test
```

**Frontend Changes:**
```bash
# Edit React components in src/
# Vite hot-reloads changes automatically
# View at: http://localhost:5173
```

**Agent Website Changes:**
```bash
# Edit js/features/ or css files
# Vite hot-reloads automatically
# View at: http://localhost:5173 (or configured port)
```

---

## 💡 Common Use Cases

### 1. **Add a New TODO Feature**
```bash
# Backend: Create new endpoint
# 1. Edit backend/routes/todos.js to add new logic
# 2. Add test: backend/__tests__/todos.test.js
# 3. Run: npm test

# Frontend: Update UI
# 1. Create/update component in frontend/src/components/
# 2. Update API call in frontend/src/api.js
# 3. Refresh browser (Vite hot-reload)
```

### 2. **Deploy to Production**
```bash
# Backend
cd backend
docker build -t todo-api:latest .
docker push your-registry/todo-api:latest

# Frontend
cd frontend
npm run build
# Deploy dist/ to static hosting (Vercel, AWS S3, etc.)

# Or use Docker Compose for full stack
docker-compose up -d
```

### 3. **Generate Code Documentation**
```bash
cd claude-cli-website/examples
./doc-generator.sh ../../backend/routes/todos.js > BACKEND_API.md
./doc-generator.sh ../../frontend/src/api.js > FRONTEND_API.md
```

### 4. **Review Code Quality**
```bash
cd claude-cli-website/examples
./code-reviewer.sh ../../backend/index.js
./code-reviewer.sh ../../frontend/src/App.jsx
```

---

## 📝 Code Examples

### Backend API Usage

**Get All TODOs:**
```javascript
const response = await fetch('http://localhost:3000/api/todos');
const todos = await response.json();
console.log(todos);
// Output: [{ id: '123', title: 'Learn React', completed: false }, ...]
```

**Create a TODO:**
```javascript
const response = await fetch('http://localhost:3000/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New Task', completed: false })
});
const newTodo = await response.json();
```

**Update a TODO:**
```javascript
const response = await fetch('http://localhost:3000/api/todos/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true })
});
```

**Delete a TODO:**
```javascript
const response = await fetch('http://localhost:3000/api/todos/123', {
  method: 'DELETE'
});
```

### Frontend Component Example

**TodoList Component:**
```jsx
import { useState, useEffect } from 'react';
import { getTodos, createTodo, deleteTodo } from '../api';

export function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port is already in use
lsof -i :3000

# Check for dependency issues
cd backend && npm install

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Build Fails
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild dependencies
cd frontend && npm install

# Check Node version
node --version  # Should be v18+
```

### Tests Failing
```bash
# Backend: Run with verbose output
cd backend && npm test -- --verbose

# Agent Website: Run in watch mode
cd agent-website && npm run test:watch

# Check for missing dependencies
npm install
```

### Docker Issues
```bash
# Rebuild image
docker build --no-cache -t todo-api .

# Check container logs
docker logs <container-id>

# Remove old images
docker image prune -a
```

---

## ⚡ Performance & Optimization

### Frontend Performance Tips
- Use Tailwind CSS classes (already optimized)
- Lazy load components with `React.lazy()`
- Minimize re-renders with `useMemo` and `useCallback`
- Bundle analysis: `npm run build && npm run preview`

### Backend Performance Tips
- In-memory store is fast for development
- For production: implement database indexing
- Use caching for `/api/jokes` and `/api/tips` endpoints
- Monitor response times: check coverage reports

### Measurement
```bash
# Frontend build size
cd frontend && npm run build
# Check dist/ folder size

# Backend test coverage
cd backend && npm run coverage
# View coverage/lcov-report/index.html

# Agent Website coverage
cd agent-website && npm run test
```

---

## 🔐 Security Considerations

### Current Setup
- ✅ CORS enabled for cross-origin requests
- ✅ UUID for todo IDs (prevents enumeration)
- ⚠️ No authentication (development only)
- ⚠️ In-memory data (no persistence)

### Before Production
- [ ] Implement authentication (JWT/OAuth)
- [ ] Add rate limiting
- [ ] Use HTTPS/TLS
- [ ] Implement CSRF protection
- [ ] Add input validation & sanitization
- [ ] Use environment variables for secrets
- [ ] Add API key authentication
- [ ] Implement request logging and monitoring

### Environment Variables Setup
```bash
# Create .env in backend/
ANTHROPIC_API_KEY=your_key
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourfrontend.com
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Client Applications                   │
├──────────────────────┬──────────────────┬────────────────┤
│  React Frontend      │  Agent Website   │  CLI Tools     │
│  (Vite + Tailwind)   │  (Vanilla JS)    │  (Examples)    │
└──────┬───────────────┴──────┬───────────┴────────────────┘
       │                      │
       └──────────┬───────────┘
                  │ API Requests
                  ▼
       ┌──────────────────────┐
       │   Express.js Backend  │
       │  (REST API, CORS)     │
       └──────────┬───────────┘
                  │
       ┌──────────┴─────────────┐
       ▼                        ▼
   ┌────────┐            ┌──────────┐
   │  TODOs │            │ Utilities │
   │ Routes │            │(Jokes,Tips)
   └────────┘            └──────────┘
```

---

## 📊 Project Statistics

| Component | Type | Tests | Coverage |
|-----------|------|-------|----------|
| Backend | Express | Jest | Available |
| Frontend | React | - | - |
| Agent Website | Vanilla JS | Vitest | Available |
| CLI Tools | Shell Scripts | Manual | N/A |

---

## Status

**Last Updated:** 2026-07-14
**Development:** In Progress

---

## Next Steps / TODOs

- [ ] Database integration (replace in-memory storage)
- [ ] Authentication/Authorization
- [ ] Deployment setup (AWS, Vercel, etc.)
- [ ] Performance optimization
- [ ] Additional test coverage
- [ ] API documentation (Swagger/OpenAPI)
