# Common Workflows & Debugging Skill

**Description:** Quick reference for frequently used workflows, troubleshooting, and debugging tips across the full stack.

**Use when:**
- Setting up for development
- Debugging issues in backend/frontend
- Running tests and viewing coverage
- Checking logs and errors
- Optimizing performance
- Cleaning up after development

## Setup & Development

### Initial Setup (One Time)
```bash
# Install all dependencies
cd backend && npm install
cd ../frontend && npm install
cd ../agent-website && npm install

# Verify installations
npm -v  # Node package manager
node -v # Should be v18+
```

### Daily Development (All Services)
```bash
# Start backend (Terminal 1)
cd backend && npm run dev

# Start frontend (Terminal 2)
cd frontend && npm run dev

# Start agent website (Terminal 3)
cd agent-website && npm run serve

# Access services:
# - Frontend: http://localhost:5173
# - Backend API: http://localhost:3000/api/todos
# - Agent Website: http://localhost:5173 (different terminal)
```

## Testing Workflows

### Run All Tests
```bash
# Backend tests
cd backend && npm test

# Agent website tests
cd agent-website && npm run test
```

### Watch Mode (Continuous Testing)
```bash
# Backend
cd backend && npm test -- --watch

# Agent website
cd agent-website && npm run test:watch
```

### View Coverage
```bash
# Backend coverage report
cd backend && npm run coverage
# Open: backend/coverage/lcov-report/index.html

# Agent website coverage
cd agent-website && npm run test
# Check terminal output for coverage summary
```

### Debug a Specific Test
```bash
cd backend
npm test -- todos.test.js --verbose
```

## Common Debugging Tasks

### Backend API Not Responding
```bash
# Check if server is running
curl http://localhost:3000/api/todos

# View server logs (should be in terminal)
# Look for errors in backend/index.js or routes/

# Restart backend
cd backend && npm run dev

# Check port in use
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

### Frontend Not Loading
```bash
# Check browser console (F12)
# Look for CORS errors or fetch failures

# Verify backend is running
curl http://localhost:3000/api/todos

# Restart frontend dev server
cd frontend && npm run dev
```

### API Call Returns 500 Error
```bash
# 1. Check backend logs (terminal running npm run dev)
# 2. Look for stack trace in terminal
# 3. Check data/todos.json exists: backend/data/todos.json
# 4. Verify request format in frontend/src/api.js
# 5. Add console.log in route handler for debugging
```

### Tests Failing
```bash
# 1. Clear cache
npm test -- --clearCache

# 2. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 3. Run with verbose output
npm test -- --verbose

# 4. Check for race conditions or async issues
```

### Docker Container Won't Start
```bash
# Check logs
docker logs <container-id>

# Rebuild image
docker build --no-cache -t todo-api .

# Check Node version in container
docker run todo-api node -v
```

## Git & Commit Workflows

### Make a Commit (Conventional Commits)
```bash
# Stage changes
git add .

# Commit with conventional format
git commit -m "feat(frontend): add dark mode toggle"
# Or use: cd claude-cli-website/examples && ./git-commit-helper.sh
```

### Review Code Before Commit
```bash
# Use code-review script
cd claude-cli-website/examples
./code-reviewer.sh ../../frontend/src/App.jsx
```

### Generate Documentation
```bash
cd claude-cli-website/examples
./doc-generator.sh ../../backend/routes/todos.js > TODOS_API.md
```

## Performance & Optimization

### Check Frontend Build Size
```bash
cd frontend
npm run build
# Check dist/ folder size
```

### Profile React Component
```javascript
// In React component
console.time('render');
// ... component code ...
console.timeEnd('render');
```

### Check API Response Time
```bash
# Backend: Add timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => console.log(`${req.path}: ${Date.now() - start}ms`));
  next();
});
```

## Database/Storage

### View Stored TODOs
```bash
cat backend/data/todos.json
```

### Clear All TODOs
```bash
echo '[]' > backend/data/todos.json
```

### Backup TODOs
```bash
cp backend/data/todos.json backend/data/todos.backup.json
```

## Cleanup & Maintenance

### Clear Node Modules (Space)
```bash
rm -rf node_modules/
npm install  # Reinstall
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Remove Docker Artifacts
```bash
# Stop all containers
docker stop $(docker ps -aq)

# Remove stopped containers
docker container prune -f

# Remove unused images
docker image prune -a -f

# Remove unused volumes
docker volume prune -f
```

### Reset Development Environment
```bash
# Complete reset
rm -rf backend/node_modules frontend/node_modules agent-website/node_modules
rm -rf backend/coverage frontend/coverage agent-website/coverage
npm install --all  # Run in each directory
```

## Useful Commands Reference

| Task | Command |
|------|---------|
| Check Node version | `node -v` |
| List running ports | `lsof -i -P -n` (macOS/Linux) |
| Kill process on port | `kill -9 $(lsof -t -i :3000)` |
| View file structure | `tree -L 2` |
| Search in codebase | `grep -r "search term" --include="*.js"` |
| Format code | `npm run format` (if configured) |
| Lint code | `npm run lint` (if configured) |

## Environment Variables

### For Backend (.env file)
```
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:5173
DEBUG=true
```

### For Frontend (import from .env.local)
```
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

## Status Checks

### Verify Full Stack is Running
```bash
# Test backend
curl http://localhost:3000/api/todos

# Test frontend dev server
curl http://localhost:5173

# Check processes
ps aux | grep node  # macOS/Linux
tasklist | findstr node  # Windows
```

## Getting Help

- **CLAUDE.md** - Full project documentation
- **AGENTS.md** - Specialized agents for specific tasks
- **Backend README** - `backend/README.md`
- **Frontend README** - `frontend/README.md`
- **CLI Examples** - `claude-cli-website/examples/`
