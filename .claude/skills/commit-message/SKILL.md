---
name: commit-message
description: Generate meaningful, standardized Git commit messages following Conventional Commits format. Use when committing code changes to ensure consistent, readable commit history. Keywords: commit message, conventional commits, git commit, changelog, versioning.
---

# Conventional Commit Message Skill

Generate professional, standardized Git commit messages that follow the **Conventional Commits** specification.

## When to Use This Skill

- Writing commit messages for code changes
- Creating consistent commit history
- Auto-generating changelogs
- Enforcing team commit standards
- Generating semantic versioning info

## Conventional Commits Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

| Type | Purpose | Example |
|------|---------|---------|
| **feat** | New feature | `feat(auth): add JWT token validation` |
| **fix** | Bug fix | `fix(todos): prevent duplicate ID creation` |
| **docs** | Documentation | `docs(readme): update installation steps` |
| **style** | Code style changes (formatting, semicolons) | `style(frontend): format React components` |
| **refactor** | Code refactoring | `refactor(api): simplify response handler` |
| **perf** | Performance improvements | `perf(backend): optimize query performance` |
| **test** | Adding/updating tests | `test(todos): add unit tests for API` |
| **ci** | CI/CD configuration | `ci(github): add workflow for tests` |
| **chore** | Dependency updates, build scripts | `chore(deps): upgrade React to 18.3.0` |
| **revert** | Reverting a previous commit | `revert: undo refactor(api) commit abc123` |

### Scope (Optional)

The scope specifies what part of the code is affected:

**Project Scopes:**
- `backend` - Express.js backend
- `frontend` - React frontend
- `agent-website` - Agent website
- `cli` - CLI tools
- `docker` - Docker configuration
- `deps` - Dependencies
- `api` - API endpoints
- `auth` - Authentication
- `ui` - User interface
- `db` - Database

### Subject Line Rules

✅ **DO:**
- Use imperative mood ("add feature", not "added feature")
- Start with lowercase (unless it's a proper noun)
- Don't include period at the end
- Keep under 50 characters
- Be specific and descriptive

❌ **DON'T:**
- Use past tense
- Use uppercase first letter
- Add period at end
- Make it too long
- Make it too vague

## Quick Examples

### Feature
```bash
git commit -m "feat(todos): add filter by completion status"
git commit -m "feat(frontend): implement dark mode toggle"
```

### Bug Fix
```bash
git commit -m "fix(api): handle missing todo ID validation"
git commit -m "fix(ui): prevent button double-click submission"
```

### Documentation
```bash
git commit -m "docs(readme): add deployment instructions"
git commit -m "docs(api): document authentication endpoints"
```

### Refactoring
```bash
git commit -m "refactor(backend): extract todo validation logic"
git commit -m "refactor(frontend): simplify component hierarchy"
```

### Testing
```bash
git commit -m "test(backend): add tests for todo creation"
git commit -m "test(frontend): add TodoList snapshot tests"
```

### Dependencies
```bash
git commit -m "chore(deps): update React from 18.2.0 to 18.3.0"
git commit -m "chore(deps): install axios for HTTP requests"
```

## Commit Message Body (Optional)

Use when you need to explain **why** the change was made:

```
feat(auth): implement JWT token validation

- Add token verification middleware
- Validate token expiration
- Return 401 for invalid tokens

Fixes #123
```

## Using with the Project

### Auto-Generate with Script
```bash
# Stage your changes
git add .

# Generate commit message using Claude
cd claude-cli-website/examples
./git-commit-helper.sh

# Use the suggested message
git commit -m "your-message"
```

### Manual Examples

**Adding a new feature:**
```bash
git add frontend/src/components/FilterTodos.jsx
git commit -m "feat(frontend): add todo filter by status"
```

**Fixing a bug:**
```bash
git add backend/routes/todos.js
git commit -m "fix(api): validate todo ID before update"
```

**Updating documentation:**
```bash
git add docs/README.md
git commit -m "docs(readme): improve installation guide"
```

**Upgrading dependencies:**
```bash
git add backend/package.json
git commit -m "chore(deps): upgrade Express from 5.0 to 5.2.1"
```

## Breaking Changes

Use `!` to indicate breaking changes:

```bash
git commit -m "feat(api)!: change todo endpoint response format"

# Or in footer:
feat(api): redesign todo response structure

BREAKING CHANGE: /api/todos now returns { items: [] } instead of []
```

## Benefits

✅ **Readable History** - Clear, searchable commit history
✅ **Automated Changelogs** - Tools can generate changelogs from commits
✅ **Semantic Versioning** - Determine version bumps (major, minor, patch)
✅ **Team Consistency** - Standardized format for all developers
✅ **Better Reviews** - Reviewers understand intent immediately

## Tools & Integration

### View Commit History
```bash
# View recent commits
git log --oneline -10

# Filter by type
git log --grep="^feat" --oneline
git log --grep="^fix" --oneline
```

### Generate Changelog
```bash
# View all features added
git log --grep="^feat" --pretty=format:"%h - %s"
```

### Branch-Specific Messages
```bash
# Feature branch
git commit -m "feat(auth): add password reset functionality"

# Bugfix branch
git commit -m "fix(security): prevent XSS in comment field"
```

## Team Guidelines

For team projects, consider:

1. **Enforce Format**: Use commit hooks to validate messages
2. **Scope Naming**: Agree on scope names beforehand
3. **Breaking Changes**: Always mark with `!` and explain in footer
4. **Message Reviews**: Review commit messages in PRs
5. **Squash Commits**: Combine work-in-progress commits into meaningful ones

## References

- [Conventional Commits Spec](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
