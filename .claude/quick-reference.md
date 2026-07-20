# Quick Reference - AI Project

## 🚀 Quick Start Commands

### Installation
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev

# Agent Website
cd agent-website && npm install && npm run serve
```

### Testing
```bash
# Backend (Jest)
cd backend && npm test
cd backend && npm run coverage

# Agent Website (Vitest)
cd agent-website && npm run test
cd agent-website && npm run test:watch
```

### Docker
```bash
# Build and run backend
docker build -t todo-api .
docker run -p 3000:3000 todo-api

# Full stack
docker-compose up -d
docker-compose down
```

---

## 📁 Key Directories

| Path | Purpose |
|------|---------|
| `backend/routes/` | API endpoints |
| `backend/__tests__/` | Jest tests |
| `frontend/src/components/` | React components |
| `frontend/src/api.js` | API client |
| `agent-website/js/features/` | Feature modules |
| `agent-website/assets/css/` | Stylesheets |
| `docs/` | Documentation |

---

## 🔧 Common Commits

```bash
# Feature
git commit -m "feat(scope): description"

# Bug fix
git commit -m "fix(scope): description"

# Refactor
git commit -m "refactor(scope): description"

# Test
git commit -m "test(scope): description"

# Documentation
git commit -m "docs(scope): description"

# Dependencies
git commit -m "chore(deps): description"
```

---

## 📝 Commit Scopes

- `backend` - API changes
- `frontend` - React UI changes
- `agent-website` - Agent website changes
- `docker` - Container config
- `test` - Testing infrastructure
- `docs` - Documentation
- `deps` - Dependencies

---

## 🧪 Test Coverage

**Backend Target:** 100% (Jest)
```bash
cd backend && npm run coverage
```

**Agent Website Target:** >80% (Vitest)
```bash
cd agent-website && npm run test
```

---

## ⚡ Performance Tips

**Backend:**
- Keep route handlers focused
- Use UUID for IDs
- Implement proper error handling

**Frontend:**
- Use React.memo for expensive components
- Implement useCallback for event handlers
- Lazy load heavy components with React.lazy()
- Use Tailwind utility classes

**Agent Website:**
- Minimize JavaScript in features
- Use CSS modules where appropriate
- Test performance with npm run test

---

## 🔒 Security Checklist

- ✅ Input validation on all endpoints
- ✅ CORS properly configured
- ✅ No sensitive data in commits
- ✅ Environment variables for secrets
- ✅ XSS protection in React components
- ✅ Error messages don't leak system info

---

## 🐛 Debugging

**Backend:**
```bash
# Run with logs
NODE_DEBUG=http npm run dev

# Check specific route
curl http://localhost:3000/api/todos

# View request details
# See backend/api.http for requests
```

**Frontend:**
```bash
# React DevTools
# Browser: Install React DevTools extension

# Vite logs
npm run dev  # Check terminal output

# Network requests
# Browser: DevTools → Network tab
```

---

## 📊 Project Statistics

| Component | Size | Tests | Coverage |
|-----------|------|-------|----------|
| Backend | ~2KB | Jest | 100% |
| Frontend | ~15KB | - | - |
| Agent Website | ~10KB | Vitest | >80% |

---

## 🎯 Agent Specializations

| Agent | Best For |
|-------|----------|
| `@backend-specialist` | API routes, middleware, tests |
| `@frontend-specialist` | React components, Tailwind CSS |
| `@code-reviewer` | Code review, PR checks |
| `@test-runner` | Running tests, debugging failures |
| `@code-stands` | Architecture, navigation, design |

---

## 💡 Pro Tips

1. **Save time:** Use `npm install` once per service instead of per-component
2. **Test locally:** Always run `npm test` before committing
3. **Review commits:** Check diff before pushing: `git diff`
4. **Use Docker:** Consistency across environments
5. **Read errors:** Error messages usually point to the solution
6. **Check coverage:** `npm run coverage` shows gaps
7. **Keep it simple:** Refactor if code gets complex
8. **Document APIs:** Comments help future developers

---

## 🚨 Common Mistakes

❌ Not running tests before commit
❌ Inconsistent commit messages
❌ Hardcoding configuration values
❌ Ignoring error cases
❌ Not updating documentation
❌ Creating deeply nested components
❌ Leaving console.log() statements
❌ Not checking code coverage

---

## 📞 Getting Help

1. **Check documentation:** `CLAUDE.md`, `AGENTS.md`
2. **Search codebase:** Look for similar implementations
3. **Read error messages:** Usually contain the solution
4. **Run tests:** `npm test` shows what's broken
5. **Ask agent:** Use `@backend-specialist`, `@frontend-specialist`, etc.

---

**Last Updated:** 2026-07-17
