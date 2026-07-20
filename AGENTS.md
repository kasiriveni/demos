# AI Project Agents

Specialized agents for different roles in the TODO management system project. Each agent is optimized for specific tasks and has access to relevant skills.

---

## 🧠 Available Agents

### **Backend Specialist**
**Purpose:** API development, routing, middleware, testing, and database operations.

**Expertise:**
- Express.js route handlers (GET, POST, PUT, DELETE)
- Middleware architecture (CORS, validation, authentication)
- Jest unit testing and mocking
- Error handling and response envelopes
- Database/JSON file operations

**Best for:**
- Writing new API endpoints
- Fixing backend bugs or API errors
- Optimizing API performance
- Adding authentication/authorization
- Creating comprehensive tests for routes

**Skills Used:**
- backend-stack
- testing-coverage
- workflows-debugging

**Example Requests:**
- "Create a new todo endpoint with validation"
- "Fix the 500 error in /api/todos/update"
- "Add error handling to all routes"
- "Write Jest tests for the jokes endpoint"

---

### **Frontend Specialist**
**Purpose:** React component development, state management, styling, and API integration.

**Expertise:**
- React 18 hooks (useState, useEffect, useMemo, useCallback)
- Component composition and props management
- Tailwind CSS utility classes and custom themes
- API integration with fetch wrapper
- Performance optimization (lazy loading, memoization)
- Accessibility (ARIA, semantic HTML)

**Best for:**
- Creating new React components
- Managing complex state logic
- Styling with Tailwind CSS
- Fixing React bugs (state, rendering, props)
- Performance optimization
- Dark mode and responsive design

**Skills Used:**
- frontend-stack
- testing-coverage (for Vitest)
- workflows-debugging

**Example Requests:**
- "Create a TodoFilter component with dark mode support"
- "Fix the state management in App.jsx"
- "Add loading states to API calls"
- "Optimize the TodoList component for large datasets"

---

### **Full-Stack Developer**
**Purpose:** End-to-end feature development and debugging across backend and frontend.

**Expertise:**
- Understanding data flow from API to UI
- Coordinating backend changes with frontend updates
- API contract and response format design
- Debugging issues that span multiple services
- Feature implementation from start to finish

**Best for:**
- Implementing complete features (API + UI)
- Fixing integration bugs (backend/frontend mismatch)
- Adding new TODO functionality (e.g., filters, categories)
- Performance optimization across stack
- End-to-end testing

**Skills Used:**
- backend-stack
- frontend-stack
- testing-coverage
- project-structure
- workflows-debugging

**Example Requests:**
- "Add a priority filter to todos (backend + frontend)"
- "Debug why API responses don't match UI expectations"
- "Implement todo categories feature end-to-end"
- "Optimize the flow from user input to database"

---

### **DevOps & Deployment**
**Purpose:** Docker containerization, deployment, environment management, and CI/CD.

**Expertise:**
- Dockerfile optimization
- docker-compose multi-service orchestration
- Environment variables and configuration
- Deployment to cloud platforms (AWS, Vercel, Heroku)
- Container troubleshooting and debugging
- Production-ready configurations

**Best for:**
- Building Docker images
- Setting up docker-compose
- Deploying to production
- Configuring environment variables
- Troubleshooting deployment issues
- CI/CD pipeline setup

**Skills Used:**
- deployment-docker
- workflows-debugging
- backend-stack

**Example Requests:**
- "Build a Docker image for production deployment"
- "Set up docker-compose for full-stack development"
- "Deploy the frontend to Vercel"
- "Fix Docker container that won't start"

---

### **Quality Assurance & Testing**
**Purpose:** Test strategy, test coverage, debugging test failures, and quality assurance.

**Expertise:**
- Jest test writing and patterns
- Vitest configuration
- Test coverage analysis
- Mocking strategies (API calls, files, modules)
- Test debugging and fixing flaky tests
- Integration tests and end-to-end tests
- Code review and quality standards

**Best for:**
- Writing comprehensive test suites
- Fixing failing tests
- Increasing code coverage
- Debugging race conditions
- Test infrastructure setup
- Code review and quality checks

**Skills Used:**
- testing-coverage
- backend-stack
- frontend-stack
- workflows-debugging

**Example Requests:**
- "Write Jest tests for the todos API"
- "Fix this flaky test in the test suite"
- "Generate coverage report and identify gaps"
- "Create mocks for API calls in React tests"

---

### **Project Architect**
**Purpose:** Project structure, navigation, design decisions, and architectural guidance.

**Expertise:**
- Full-stack architecture understanding
- Codebase navigation and structure
- Design patterns and best practices
- Data flow and component interactions
- Project conventions and standards
- Refactoring and code organization
- Documentation and project clarity

**Best for:**
- Understanding project architecture
- Onboarding new developers
- Making architectural decisions
- Refactoring code structure
- Establishing project conventions
- Documenting project design
- Planning new features

**Skills Used:**
- project-structure
- workflows-debugging
- backend-stack
- frontend-stack

**Example Requests:**
- "Explain the data flow for todo creation"
- "Where should I add this new feature?"
- "How is the project organized?"
- "Refactor the component structure for clarity"

---

### **CLI & Automation**
**Purpose:** Command-line tools, scripting, automation, and utilities.

**Expertise:**
- Shell script development
- Code review automation
- Documentation generation
- Git commit message generation
- Log analysis and debugging
- SQL query optimization
- Translation utilities

**Best for:**
- Creating automation scripts
- Generating documentation from code
- Creating commit messages
- Analyzing logs and performance
- Building CLI utilities
- Code quality automation

**Skills Used:**
- workflows-debugging
- backend-stack
- frontend-stack

**Example Requests:**
- "Create a script to auto-review code"
- "Generate API documentation from code"
- "Build a script to analyze server logs"
- "Create a commit message from staged changes"

---

## 🎯 Quick Agent Selection Guide

### By Task Type

| Task | Recommended Agent |
|------|-------------------|
| Create new API endpoint | Backend Specialist |
| Build new React component | Frontend Specialist |
| Add feature end-to-end | Full-Stack Developer |
| Fix API + UI issue together | Full-Stack Developer |
| Write/fix tests | Quality Assurance & Testing |
| Deploy to production | DevOps & Deployment |
| Understand architecture | Project Architect |
| Optimize performance | Full-Stack Developer |
| Review code | Quality Assurance & Testing |
| Create automation script | CLI & Automation |

### By Component

| Component | Best Agent |
|-----------|-----------|
| Backend (Express) | Backend Specialist |
| Frontend (React) | Frontend Specialist |
| Tests (Jest/Vitest) | Quality Assurance & Testing |
| Docker setup | DevOps & Deployment |
| Project structure | Project Architect |
| CLI tools | CLI & Automation |

### By Skill Level

| Level | Approach |
|-------|----------|
| Getting started | Use Project Architect for overview |
| Learning backend | Use Backend Specialist with instructions |
| Learning frontend | Use Frontend Specialist with examples |
| Solving specific issue | Use specialist (Backend/Frontend/QA) |
| System design | Use Project Architect |
| Production ready | Use DevOps & Deployment |

---

## 🚀 Usage Examples

### Example 1: Add a New Feature (Complete Tasks)
```
1. Ask Project Architect: "Where should I add a due-date feature?"
2. Ask Backend Specialist: "Create the due-date API endpoint with validation"
3. Ask Frontend Specialist: "Create components for due-date picker and display"
4. Ask Quality Assurance: "Write tests for the new feature"
5. Ask DevOps: "Verify deployment works with new changes"
```

### Example 2: Debug Performance Issue
```
1. Ask Full-Stack Developer: "Why is the todo list slow to load?"
2. Use DevOps to profile in production
3. Ask Backend Specialist if it's an API issue
4. Ask Frontend Specialist if it's a React rendering issue
```

### Example 3: Onboard New Developer
```
1. Ask Project Architect: "Give me a project overview"
2. Ask Backend Specialist: "Explain the API structure"
3. Ask Frontend Specialist: "Explain the component structure"
4. Ask Quality Assurance: "How do I run tests?"
```

---

## 📋 Agent Capabilities Matrix

| Agent | Backend | Frontend | Testing | DevOps | Architecture | Debugging |
|-------|---------|----------|---------|--------|--------------|-----------|
| Backend Specialist | ⭐⭐⭐ | ⭐ | ⭐⭐ | ⭐ | ⭐ | ⭐⭐⭐ |
| Frontend Specialist | ⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ | ⭐ | ⭐⭐⭐ |
| Full-Stack Developer | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| DevOps & Deployment | ⭐ | ⭐ | ⭐ | ⭐⭐⭐ | ⭐ | ⭐⭐ |
| Quality Assurance | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐ | ⭐ | ⭐⭐ |
| Project Architect | ⭐⭐ | ⭐⭐ | ⭐ | ⭐ | ⭐⭐⭐ | ⭐ |
| CLI & Automation | ⭐⭐ | ⭐⭐ | ⭐ | ⭐⭐ | ⭐ | ⭐ |

**⭐ = Capability level (1-3 stars)**

---

## 📚 Related Documentation

- [CLAUDE.md](CLAUDE.md) - Full project documentation and standup
- [.claude/skills/](\.claude\skills\) - Detailed skill references
- [backend/README.md](backend/README.md) - Backend-specific guide
- [frontend/README.md](frontend/README.md) - Frontend-specific guide

---

## 🔄 Agent Collaboration

Agents can work together for complex tasks:

1. **Project Architect** identifies requirements
2. **Backend Specialist** implements API
3. **Frontend Specialist** builds UI
4. **Quality Assurance** writes tests
5. **DevOps & Deployment** handles release

---

## 💡 Tips for Using Agents

1. **Be specific** - Include context about what you're working on
2. **Choose the right specialist** - Use the selection guide above
3. **Chain agents** - Use multiple agents for end-to-end features
4. **Reference skills** - Mention relevant skills from `.claude/skills/`
5. **Ask for examples** - Agents can provide code examples and patterns
6. **Explain the goal** - Clear goals lead to better solutions

---

## 📝 Custom Agent Notes

When working with an agent, you can:
- Ask for best practices and patterns
- Request code reviews
- Get debugging help
- Learn project conventions
- Get performance optimization tips
- Discuss architectural decisions

---

**Last Updated:** 2026-07-17
**Project:** Full-Stack TODO App (Express + React + Vite + Docker)
**Total Agents:** 7 specialized agents
**Focus:** Backend, Frontend, Full-Stack, DevOps, QA, Architecture, Automation
