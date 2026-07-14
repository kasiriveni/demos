# Project Commit Message Examples

Real-world commit message examples for the TODO app project following Conventional Commits format.

## Backend Commits (`/backend`)

### Features
```bash
git commit -m "feat(api): add pagination for todos endpoint"
git commit -m "feat(api): implement todo priority levels"
git commit -m "feat(api): add filtering by completion status"
git commit -m "feat(backend): add request validation middleware"
```

### Bug Fixes
```bash
git commit -m "fix(api): validate todo ID before update operation"
git commit -m "fix(todos): prevent duplicate IDs on creation"
git commit -m "fix(api): handle missing title in POST request"
git commit -m "fix(routes): return 404 when todo not found"
```

### Tests
```bash
git commit -m "test(backend): add unit tests for todos endpoint"
git commit -m "test(api): add validation error handling tests"
git commit -m "test(backend): increase coverage to 85%"
```

### Dependencies
```bash
git commit -m "chore(deps): upgrade Express from 5.0.0 to 5.2.1"
git commit -m "chore(deps): update Jest to latest version"
git commit -m "chore(deps): add helmet for security headers"
```

### Documentation
```bash
git commit -m "docs(api): document todo endpoint parameters"
git commit -m "docs(backend): add error handling guide"
```

## Frontend Commits (`/frontend`)

### Features
```bash
git commit -m "feat(ui): add dark mode toggle"
git commit -m "feat(components): create FilterTodos component"
git commit -m "feat(frontend): implement todo search functionality"
git commit -m "feat(ui): add delete confirmation dialog"
git commit -m "feat(components): create TodoStats component"
```

### Bug Fixes
```bash
git commit -m "fix(ui): resolve button alignment issue in Header"
git commit -m "fix(components): prevent TodoItem double-click submission"
git commit -m "fix(frontend): fix API error handling in TodoList"
git commit -m "fix(ui): correct responsive layout on mobile"
```

### Refactoring
```bash
git commit -m "refactor(frontend): simplify component hierarchy"
git commit -m "refactor(components): extract TodoForm logic"
git commit -m "refactor(api): centralize API calls in service"
```

### Styling
```bash
git commit -m "style(frontend): format React components with Prettier"
git commit -m "style(css): reorganize Tailwind utility classes"
```

### Tests
```bash
git commit -m "test(frontend): add TodoList component tests"
git commit -m "test(components): add Button snapshot tests"
```

### Dependencies
```bash
git commit -m "chore(deps): upgrade React from 18.2.0 to 18.3.0"
git commit -m "chore(deps): update Tailwind CSS to 4.3.1"
git commit -m "chore(deps): install React Query for data fetching"
```

## Agent Website Commits (`/agent-website`)

### Features
```bash
git commit -m "feat(features): add animation module"
git commit -m "feat(website): implement navigation system"
git commit -m "feat(content): add Easter egg functionality"
```

### Tests
```bash
git commit -m "test(agent-website): add coverage for animations"
git commit -m "test(features): add navigation tests"
```

### Build
```bash
git commit -m "ci(github): add GitHub Actions workflow"
git commit -m "ci(build): configure Vite for production"
```

## CLI Tools Commits (`/claude-cli-website`)

### Features
```bash
git commit -m "feat(cli): add new SQL optimizer script"
git commit -m "feat(tools): enhance code-reviewer output"
```

### Improvements
```bash
git commit -m "refactor(cli): improve error handling in scripts"
git commit -m "perf(tools): optimize documentation generator"
```

## Docker & DevOps

### Configuration
```bash
git commit -m "ci(docker): add Docker Compose for full stack"
git commit -m "ci(docker): configure backend container"
git commit -m "ci(github): add deployment workflow"
```

## Multi-line Commit Examples

### Feature with Body
```bash
git commit -m "feat(api): implement JWT authentication

- Add JWT token generation on login
- Add token verification middleware
- Add refresh token mechanism
- Store tokens in secure HTTP-only cookies

Fixes #45"
```

### Breaking Change
```bash
git commit -m "feat(api)!: redesign todo response format

BREAKING CHANGE: /api/todos now returns { items: [], total: 0 } instead of array"
```

### Complex Fix
```bash
git commit -m "fix(frontend): resolve memory leak in TodoList

The component wasn't cleaning up event listeners in useEffect cleanup.
Now properly removing listeners when component unmounts.

Fixes #128"
```

## Commit Message Template for Team

Save as `.gitmessage` in project root:

```
# <type>(<scope>): <subject>
# Example: feat(api): add pagination

# <body>
# Explain what and why, not how
# Keep lines under 72 characters

# <footer>
# Reference issues: Fixes #123
# Or: Refs #456
```

Use with:
```bash
git config commit.template .gitmessage
```

## Workflow Steps

1. **Make changes** to code
   ```bash
   # Edit files
   ```

2. **Stage changes**
   ```bash
   git add .
   ```

3. **Generate commit message** (optional)
   ```bash
   cd claude-cli-website/examples
   ./git-commit-helper.sh
   ```

4. **Create commit** with conventional format
   ```bash
   git commit -m "type(scope): subject"
   ```

5. **View history**
   ```bash
   git log --oneline -10
   ```

## Quick Reference Checklist

- [ ] Type is one of: feat, fix, docs, style, refactor, perf, test, ci, chore, revert
- [ ] Scope is from project list: backend, frontend, agent-website, cli, docker, deps, api, auth, ui, db
- [ ] Subject uses imperative mood ("add" not "added")
- [ ] Subject starts lowercase
- [ ] Subject has no period at end
- [ ] Subject is under 50 characters
- [ ] Optional body explains WHY, not WHAT
- [ ] Breaking changes marked with `!` or in footer

## Tools for Validation

### Pre-commit Hook
```bash
#!/bin/bash
# .git/hooks/pre-commit

MSG=$(git diff --cached --name-only | head -1)
if [[ ! $MSG =~ ^(feat|fix|docs|style|refactor|perf|test|ci|chore|revert) ]]; then
  echo "❌ Commit message must start with: feat, fix, docs, style, refactor, perf, test, ci, chore, or revert"
  exit 1
fi
```

### Commit Message Linting
```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# Create commitlint.config.js
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# Use in husky pre-commit hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "${1}"'
```

## Generate Changelog

View commits by type:
```bash
# All features
git log --grep="^feat" --oneline

# All fixes
git log --grep="^fix" --oneline

# All changes since tag
git log v1.0.0..HEAD --oneline

# Generate changelog
git log --pretty=format:"- %s" | grep "^- (feat|fix)" > CHANGELOG.md
```

## Team Guidelines Summary

1. ✅ Always use Conventional Commits format
2. ✅ Generate with script: `./git-commit-helper.sh`
3. ✅ Review commits in pull requests
4. ✅ Use scope to identify component
5. ✅ Mark breaking changes with `!`
6. ✅ Reference issues: `Fixes #123`
7. ✅ Squash work-in-progress commits before merge
8. ✅ Follow subject line rules (50 chars, imperative)

---

**Last Updated:** 2026-07-14
**Skill:** commit-message
**Reference:** [Conventional Commits](https://www.conventionalcommits.org/)
