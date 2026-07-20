# Claude Skills Index

This directory contains specialized skills for the AI project—a full-stack TODO management system with Express backend, React frontend, and automation tools.

## 📚 Available Skills

### 1. **Backend Stack** (`backend-stack/SKILL.md`)
Master the Express.js API, routing, middleware, and testing.

**When to use:**
- Writing new API routes (GET, POST, PUT, DELETE)
- Adding middleware (CORS, validation, authentication)
- Debugging backend issues or API errors
- Writing Jest unit tests
- Managing dependencies in `backend/`

**Key topics:**
- Express.js 5.2.1 patterns
- Route handlers and request/response
- Middleware architecture
- Jest testing & mocking
- JSON file storage (data/todos.json)

---

### 2. **Frontend Stack** (`frontend-stack/SKILL.md`)
Build with React 18, Vite, and Tailwind CSS with hot-reload development.

**When to use:**
- Creating new React components
- Managing state and effects
- Styling with Tailwind CSS
- Integrating backend API calls
- Debugging React issues (state, renders, props)
- Dark mode and accessibility features

**Key topics:**
- React 18 components & hooks
- Vite dev server & hot-reload
- Tailwind CSS utility patterns
- API integration with fetch
- Performance optimization (useMemo, useCallback)

---

### 3. **Testing & Coverage** (`testing-coverage/SKILL.md`)
Write comprehensive tests with Jest (backend) and Vitest (agent-website).

**When to use:**
- Writing unit tests for routes/components
- Running test suites and debugging failures
- Checking code coverage reports
- Fixing flaky or failing tests
- Creating mocks for dependencies
- Setting up integration tests

**Key topics:**
- Jest test structure and assertions
- Vitest configuration & best practices
- Code coverage analysis
- Mocking strategies
- Coverage reports

---

### 4. **Deployment & Docker** (`deployment-docker/SKILL.md`)
Deploy with Docker, docker-compose, and production optimization.

**When to use:**
- Building Docker images for backend
- Setting up docker-compose for full stack
- Configuring environment variables
- Deploying to AWS, Vercel, Heroku, etc.
- Troubleshooting container issues
- Production security and optimization

**Key topics:**
- Dockerfile structure
- docker-compose multi-service setup
- Environment variables for different stages
- Platform-specific deployment (AWS, Vercel, Heroku)
- Container troubleshooting & cleanup

---

### 5. **Project Structure & Navigation** (`project-structure/SKILL.md`)
Understand the codebase architecture and how components connect.

**When to use:**
- Onboarding to the project
- Tracing features end-to-end
- Finding where code lives
- Understanding data flow
- Mapping component dependencies
- Explaining architecture to team

**Key topics:**
- Full-stack folder structure
- Key files by purpose (API, UI, config)
- Data flow examples
- Running the full stack
- Project conventions (commits, naming, folders)

---

### 6. **Common Workflows & Debugging** (`workflows-debugging/SKILL.md`)
Quick reference for daily development, troubleshooting, and debugging.

**When to use:**
- Initial project setup
- Starting all services for development
- Debugging backend/frontend issues
- Running tests and viewing coverage
- Checking logs and errors
- Performance profiling
- Cleanup and maintenance

**Key topics:**
- Development setup & startup
- Testing workflows (run, watch, coverage)
- Debugging API, frontend, and Docker issues
- Git & commit workflows
- Performance & optimization tips
- Useful commands reference
- Status checks

---

## 🚀 Quick Start Guide

### 1. **First Time Setup?**
Read [Project Structure & Navigation](project-structure/SKILL.md) for an overview.

### 2. **Starting Development?**
Follow [Common Workflows & Debugging](workflows-debugging/SKILL.md) → Setup & Development section.

### 3. **Working on Backend?**
Use [Backend Stack](backend-stack/SKILL.md) for route patterns and testing.

### 4. **Working on Frontend?**
Use [Frontend Stack](frontend-stack/SKILL.md) for React components and Tailwind patterns.

### 5. **Writing Tests?**
Reference [Testing & Coverage](testing-coverage/SKILL.md) for Jest/Vitest examples.

### 6. **Deploying to Production?**
Check [Deployment & Docker](deployment-docker/SKILL.md) for containerization and platform setup.

### 7. **Stuck with an Issue?**
See [Common Workflows & Debugging](workflows-debugging/SKILL.md) → Common Debugging Tasks.

---

## 🎯 Skill Selection by Task

| Task | Skill |
|------|-------|
| Create new API endpoint | Backend Stack |
| Build new React component | Frontend Stack |
| Fix test failure | Testing & Coverage |
| Deploy to production | Deployment & Docker |
| Understand data flow | Project Structure & Navigation |
| Debug CORS error | Common Workflows & Debugging |
| Optimize performance | Frontend Stack + Common Workflows |
| Set up docker-compose | Deployment & Docker |
| Run full stack locally | Common Workflows & Debugging |
| Add validation middleware | Backend Stack |
| Fix state issue in React | Frontend Stack |
| Write Jest test | Testing & Coverage |

---

## 📋 Project Stack Reference

- **Backend:** Express.js 5.2.1 (Node.js)
- **Frontend:** React 18.2.0 + Vite 4.2.1 + Tailwind CSS 4.3.1
- **Testing:** Jest (backend), Vitest (agent-website)
- **Styling:** Tailwind CSS utility-first
- **Deployment:** Docker, docker-compose
- **Storage:** JSON file (data/todos.json)

---

## 📂 Folder Structure

```
.claude/skills/               ← You are here
├── backend-stack/
├── frontend-stack/
├── testing-coverage/
├── deployment-docker/
├── project-structure/
├── workflows-debugging/
└── SKILLS-INDEX.md           ← This file
```

---

## 💡 Tips

1. **Bookmark this index** for quick skill lookup
2. **Each skill is self-contained** — you don't need to read others first
3. **See CLAUDE.md** in project root for full documentation
4. **See AGENTS.md** for specialized agents (backend-specialist, frontend-specialist, etc.)
5. **Use grep to search** the codebase: `grep -r "search" --include="*.js"`

---

## 🔗 Related Files

- [CLAUDE.md](../../CLAUDE.md) - Full project documentation
- [AGENTS.md](../../AGENTS.md) - Specialized agents for tasks
- [backend/README.md](../../backend/README.md) - Backend-specific guide
- [frontend/README.md](../../frontend/README.md) - Frontend-specific guide
- [claude-cli-website/examples/](../../claude-cli-website/examples/) - CLI tool examples

---

**Last Updated:** 2026-07-17
**Project:** Full-Stack TODO App with Express + React + Vite
