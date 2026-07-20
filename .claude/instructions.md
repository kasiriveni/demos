# Claude Instructions - AI Project

This document provides guidance for Claude agents and developers working on the full-stack TODO management system.

---

## 🎯 Project Context

**Project Name:** AI Full-Stack TODO Management System
**Purpose:** A comprehensive full-stack application with multiple client interfaces for managing TODOs with supporting utilities.

**Tech Stack:**
- **Backend:** Express.js (Node.js) REST API
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Agent Website:** Vanilla JavaScript with Vite
- **Testing:** Jest (backend), Vitest (agent-website)
- **Deployment:** Docker & Docker Compose
- **CLI Tools:** Shell scripts for automation

---

## 📁 Project Structure & Ownership

### Backend (`/backend`)
**Owner Specialty:** Backend Specialist Agent
**Responsibilities:** Express.js API, routing, middleware, database operations
- `index.js` - Server entry point
- `routes/` - API endpoints (todos, jokes, tips)
- `__tests__/` - Jest test suite with 100% coverage target
- `data/todos.json` - In-memory JSON file store
- `Dockerfile` & `docker-compose.yml` - Container configuration

### Frontend (`/frontend`)
**Owner Specialty:** Frontend Specialist Agent
**Responsibilities:** React components, state management, UI/UX
- `src/main.jsx` - Vite entry point
- `src/App.jsx` - Main React component
- `src/components/` - Reusable components (Button, TodoList, InputForm, etc.)
- `src/api.js` - Fetch wrapper for backend integration
- `tailwind.config.cjs` - Tailwind CSS configuration

### Agent Website (`/agent-website`)
**Owner Specialty:** Frontend Specialist Agent
**Responsibilities:** Feature modules, animations, documentation site
- `js/features/` - Feature modules (animations, content, navigation, projects, easter-egg)
- `assets/css/` - Modular CSS (base, components, utilities)
- `docs/` - Documentation pages
- `vitest.config.js` - Vitest test configuration

### CLI Tools (`/claude-cli-website/examples`)
**Owner Specialty:** CLI & Automation Agent
**Responsibilities:** Code review automation, documentation generation, git helpers
- `code-reviewer.sh` - Automated code quality analysis
- `doc-generator.sh` - API documentation generation
- `git-commit-helper.sh` - Conventional commit message generation
- `log-analyzer.sh` - Log analysis and debugging
- `sql-optimizer.sh` - Query optimization
- `translator.sh` - Documentation translation

### Documentation (`/docs`, Root files)
- `CLAUDE.md` - Project standup and architecture
- `AGENTS.md` - Agent roles and specializations
- `README.md` - Quick start guide
- `docs/` - Detailed guides (agent.md, github.md)

---

## 🚀 Development Workflow

### Initial Setup
```bash
# 1. Clone/setup repository
# 2. Install dependencies for all services
cd backend && npm install
cd ../frontend && npm install
cd ../agent-website && npm install

# 3. Start all services in parallel terminals
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: Agent Website
cd agent-website && npm run serve
```

### Port Configuration
- **Backend:** Defined in `backend/index.js` (default: 3000)
- **Frontend:** Vite default (typically 5173)
- **Agent Website:** Vite default (typically 5174)

---

## 📋 Naming Conventions

### Files & Directories
- **Backend routes:** `/backend/routes/[entity].js` (e.g., `todos.js`, `jokes.js`)
- **React components:** `[ComponentName].jsx` (PascalCase)
- **API module:** `api.js` (single file with fetch wrapper)
- **Feature modules:** `features/[feature-name].js` (kebab-case)
- **Tests:** `__tests__/[module].test.js` or `tests/[module].test.js`

### Variables & Functions
- **JavaScript:** camelCase for variables and functions
- **Classes/Components:** PascalCase
- **Constants:** UPPER_SNAKE_CASE
- **Private variables:** Leading underscore `_privateVar`

### Git Branches
- Feature: `feature/todo-categories`
- Bug fix: `fix/validation-error`
- Refactor: `refactor/api-structure`
- Documentation: `docs/api-guide`

---

## 📝 Commit Message Standards

**Specification:** Conventional Commits (https://www.conventionalcommits.org/)

### Format
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
- `test` - Testing infrastructure

### Commit Examples
```bash
# Feature
git commit -m "feat(frontend): add dark mode toggle"

# Bug fix
git commit -m "fix(todos): prevent duplicate IDs on creation"

# Refactoring
git commit -m "refactor(backend): simplify validation logic"

# Testing
git commit -m "test(api): add comprehensive error handling tests"

# Documentation
git commit -m "docs(readme): add Docker deployment section"

# Dependencies
git commit -m "chore(deps): upgrade Vite to 4.2.1"
```

### Rules
✅ **Use imperative mood:** "add feature" (not "added feature")
✅ **Lowercase subject:** "add feature" (not "Add feature")
✅ **No period at end:** "add feature" (not "add feature.")
✅ **Maximum 50 characters:** Keep subject line concise
✅ **Be specific:** "fix null reference in todo" (not "fix bug")
✅ **Reference issues:** Add `Closes #123` in footer

---

## 🧪 Testing Requirements

### Backend Testing (Jest)
**Location:** `backend/__tests__/`
**Target Coverage:** 100%
**Run Tests:** `cd backend && npm test`
**Coverage Report:** `npm run coverage`

**Test Structure:**
```javascript
describe('TODO API', () => {
  test('should return all todos', async () => {
    // Test implementation
  });
});
```

**Guidelines:**
- Test all route handlers (GET, POST, PUT, DELETE)
- Mock file system operations
- Test error cases and edge cases
- Maintain 100% line coverage target

### Frontend Testing (Vitest)
**Location:** `agent-website/` (Vitest configured)
**Target Coverage:** >80%
**Run Tests:** `npm run test`
**Watch Mode:** `npm run test:watch`

**Test Structure:**
- Unit tests for feature modules
- Integration tests for module interactions
- Component testing for React components (when applicable)

---

## 🔄 API Design Guidelines

### RESTful Endpoints
**Pattern:** `/api/[resource]` or `/api/[resource]/:id`

### Standard Operations
```
GET    /api/todos        - List all todos
GET    /api/todos/:id    - Get single todo
POST   /api/todos        - Create new todo
PUT    /api/todos/:id    - Update todo
DELETE /api/todos/:id    - Delete todo
```

### Request/Response Format
**Content-Type:** `application/json`

**Standard Response Envelope:**
```json
{
  "status": "success|error",
  "data": {},
  "message": "Optional message"
}
```

**Error Responses:**
```json
{
  "status": "error",
  "message": "Descriptive error message",
  "code": "ERROR_CODE"
}
```

### Validation
- Validate all input parameters
- Return 400 Bad Request for invalid input
- Use UUID for resource IDs (already implemented with `uuid` package)
- Return 404 Not Found for missing resources

---

## 🎨 Frontend Component Guidelines

### Component Structure
```jsx
// Functional component with hooks
export function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    // JSX
  );
}
```

### Tailwind CSS Usage
- Use utility classes for styling (avoid inline styles)
- Dark mode: Use `dark:` prefix for dark mode styles
- Responsive: Use breakpoints (sm:, md:, lg:, xl:)
- Accessibility: Use semantic HTML and ARIA labels

### Props Validation
- Document all props
- Use destructuring in function parameters
- Provide sensible defaults

---

## 🐳 Docker & Deployment

### Building Docker Image
```bash
cd backend
docker build -t todo-api:latest .
docker run -p 3000:3000 todo-api:latest
```

### Docker Compose
```bash
# Start all services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]
```

### Environment Variables
**Required for production:**
- `NODE_ENV=production`
- `PORT=3000` (backend)
- `CORS_ORIGIN=https://yourdomain.com`

---

## 🐛 Common Development Tasks

### Task: Add New Backend Endpoint
1. Create route handler in `backend/routes/[entity].js`
2. Add comprehensive error handling
3. Write tests in `backend/__tests__/`
4. Ensure 100% test coverage
5. Document endpoint in API comments
6. Commit with `feat(api): add new endpoint`

### Task: Create New React Component
1. Create component file in `frontend/src/components/`
2. Use hooks for state management
3. Import from `frontend/src/api.js` for backend calls
4. Style with Tailwind CSS classes
5. Add TypeScript/JSDoc comments for props
6. Commit with `feat(frontend): new component`

### Task: Add Feature to Agent Website
1. Create module in `agent-website/js/features/`
2. Add styles to `agent-website/assets/css/`
3. Add tests in `agent-website/` (Vitest)
4. Document usage in `docs/`
5. Commit with `feat(agent-website): new feature`

### Task: Fix a Bug
1. Reproduce the issue
2. Write a failing test (if applicable)
3. Implement the fix
4. Ensure test passes
5. Run full test suite
6. Commit with `fix(scope): description of fix`

---

## ✅ Pre-Commit Checklist

Before committing code, ensure:

### Code Quality
- [ ] Code follows project naming conventions
- [ ] No console.log() or debug statements
- [ ] No commented-out code blocks
- [ ] Variables have descriptive names
- [ ] Functions are under 50 lines (ideally)
- [ ] DRY principle applied (no duplicate code)

### Testing
- [ ] All tests pass: `npm test`
- [ ] Test coverage meets targets (100% backend, >80% agent-website)
- [ ] New code has corresponding tests
- [ ] Edge cases are covered

### Backend Specific
- [ ] API responses follow envelope format
- [ ] Error handling is comprehensive
- [ ] No hardcoded values (use constants)
- [ ] CORS properly configured

### Frontend Specific
- [ ] Components are reusable
- [ ] Props are documented
- [ ] Tailwind classes used (no custom CSS unless necessary)
- [ ] Responsive design tested on mobile/desktop
- [ ] Accessibility: semantic HTML, ARIA labels where needed

### General
- [ ] Commit message follows Conventional Commits
- [ ] No sensitive data in commit (API keys, passwords)
- [ ] Branch is up-to-date with main/develop
- [ ] CI/CD checks would pass

---

## 🔍 Code Review Focus Areas

### Security
- Input validation on all endpoints
- No SQL injection risks
- No XSS vulnerabilities in React
- Secure CORS configuration

### Performance
- Efficient database queries
- Appropriate use of React.memo, useMemo, useCallback
- Lazy loading for heavy components
- Optimized asset sizes

### Maintainability
- Clear variable and function names
- Sufficient comments for complex logic
- DRY principle applied
- Consistent code style

### Testing
- Adequate test coverage
- Tests cover happy path and error cases
- No flaky or brittle tests
- Meaningful test descriptions

---

## 🛠️ Troubleshooting Guide

### Backend Issues
```bash
# Port already in use
lsof -i :3000  # Find process
kill -9 <PID>  # Kill process

# Module not found
rm -rf node_modules package-lock.json
npm install

# Tests failing
npm test -- --verbose  # Run with output
```

### Frontend Issues
```bash
# Vite cache issues
rm -rf node_modules/.vite

# Build fails
npm install  # Reinstall
npm run build  # Rebuild

# Port conflict
npm run dev -- --port 5174  # Use different port
```

### Docker Issues
```bash
# Rebuild image
docker build --no-cache -t todo-api .

# View logs
docker logs <container-id>

# Remove containers
docker-compose down -v  # Remove volumes too
```

---

## 📚 Key Files Reference

### Must-Know Files
| File | Purpose |
|------|---------|
| `backend/index.js` | Server entry, route setup |
| `frontend/src/App.jsx` | Main React component |
| `frontend/src/api.js` | API integration layer |
| `backend/routes/todos.js` | TODO endpoints |
| `agent-website/js/features/` | Feature modules |

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Dependencies per service |
| `tailwind.config.cjs` | Tailwind CSS config |
| `vitest.config.js` | Vitest configuration |
| `docker-compose.yml` | Multi-container setup |
| `Dockerfile` | Backend container config |

---

## 🚨 Anti-Patterns to Avoid

❌ **Don't:**
- Leave TODO comments in production code
- Use `var` keyword (use `const` or `let`)
- Create deeply nested components
- Skip error handling
- Hardcode configuration values
- Write untested code
- Use inconsistent naming conventions
- Mix frontend and backend logic
- Ignore CORS errors
- Create memory leaks in React components

✅ **Do:**
- Use `const` by default
- Keep components focused and reusable
- Handle all error cases
- Use environment variables
- Write tests first or alongside code
- Follow naming conventions
- Separate concerns (frontend/backend)
- Use proper error boundaries
- Clean up subscriptions in useEffect
- Review code before committing

---

## 📞 When to Use Each Agent

| Task | Agent | Command |
|------|-------|---------|
| Fix API bug | Backend Specialist | `@backend-specialist` |
| Create React component | Frontend Specialist | `@frontend-specialist` |
| End-to-end feature | Full-Stack Developer | Contact Project Lead |
| Code review | Code Reviewer | `@code-reviewer` |
| Understand architecture | Project Architect | `@code-stands` |
| Run/debug tests | Test Runner | `@test-runner` |
| Automation/scripts | CLI & Automation | `@cli` |

---

## 🎓 Learning Resources

### Documentation
- **Project Standup:** `CLAUDE.md`
- **Agent Roles:** `AGENTS.md`
- **Commit Guide:** `docs/COMMIT-EXAMPLES.md`
- **API Guide:** `backend/README.md`
- **Frontend Guide:** `frontend/README.md`

### Quick References
- **Express.js Docs:** https://expressjs.com/
- **React 18 Docs:** https://react.dev/
- **Tailwind CSS Docs:** https://tailwindcss.com/
- **Conventional Commits:** https://www.conventionalcommits.org/
- **Vite Docs:** https://vitejs.dev/

---

## 📋 Version Information

**Last Updated:** 2026-07-17
**Node.js Version:** v18+ (required)
**NPM Version:** v9+ (recommended)
**React Version:** 18.2.0
**Express Version:** ^5.2.1
**Vite Version:** ^4.2.1

---

## ✨ Success Criteria

Your work on this project is successful when:

✅ Code follows conventions and passes linting
✅ All tests pass with proper coverage
✅ Commits use Conventional Commits format
✅ API endpoints return proper response envelopes
✅ React components are reusable and accessible
✅ Docker builds successfully
✅ Code is reviewed by team before merging
✅ Documentation is updated with changes
✅ No console errors in development
✅ Performance metrics are acceptable

---

**For questions or updates to these instructions, consult CLAUDE.md or contact the Project Lead.**
