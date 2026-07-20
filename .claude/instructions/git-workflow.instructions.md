---
description: "Use when creating branches, commits, pull requests, and managing code reviews. Covers branch naming, commit messages, PR standards, and review process."
name: "Git Workflow Standards"
applyTo: "{backend,frontend,agent-website}/**"
---

# Git Workflow Standards

## Branch Naming Convention

All branches must follow the pattern: `<type>/<short-description>`

**Types:**
- `feature/` - New feature or enhancement
- `fix/` - Bug fix
- `refactor/` - Code refactoring (no functional changes)
- `docs/` - Documentation updates
- `test/` - Test additions or fixes
- `perf/` - Performance improvements
- `chore/` - Dependencies, build config, scripts

**Rules:**
- Use lowercase letters and hyphens (no spaces or underscores)
- Keep description short and descriptive (2-4 words)
- Start from `main` or `develop` branch

**Examples:**
```
feature/dark-mode-toggle
fix/todo-delete-race-condition
refactor/extract-api-service
docs/readme-deployment-section
test/jest-todos-api
perf/optimize-list-render
chore/upgrade-react-18
```

## Commit Message Standards

Follow **Conventional Commits** specification for all commits.

**Format:**
```
<type>(<scope>): <subject>

<optional body>
<optional footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting, missing semicolons, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Test additions or fixes
- `ci` - CI/CD changes
- `chore` - Build, dependencies, tooling

**Scopes:**
- `api` - API endpoints
- `backend` - Backend logic
- `frontend` - Frontend code
- `component` - Specific component name (e.g., `TodoItem`)
- `auth` - Authentication
- `ui` - User interface
- `styling` - CSS/styling
- `config` - Configuration files
- `deps` - Dependencies
- `docker` - Docker configuration

**Rules:**
- Use imperative mood: "add feature" not "added feature"
- Lowercase subject, no period at end
- Maximum 50 characters for subject
- Wrap body at 72 characters
- Reference issues: "Fixes #123" or "Relates to #456"

**Examples:**
```
feat(api): add todo filtering by status
fix(component): prevent duplicate todo IDs on creation
docs(readme): add quick start guide
refactor(api): simplify validation logic
perf(frontend): memoize todo list filtering
test(backend): add unit tests for error handling
chore(deps): upgrade Express to 5.2.1
```

## Pull Request Process

### 1. Create PR

**Branch:** Create from `main` or `develop` (check project convention)
```bash
git checkout -b feature/my-feature
# Make changes
git push origin feature/my-feature
```

### 2. PR Title and Description

**Title Format:** Follow commit naming pattern
```
feat(backend): add bulk delete endpoint
```

**Description Template:**
```markdown
## What does this PR do?
Brief description of the changes.

## Why are these changes needed?
Explain the motivation or issue this fixes.

## Related Issues
Fixes #123, Relates to #456

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Error cases tested

## Checklist
- [ ] Code follows project standards
- [ ] No console errors/warnings
- [ ] Comments added for complex logic
- [ ] Documentation updated if needed
- [ ] Breaking changes documented
```

### 3. Code Review Checklist

Reviewers must check:
- [ ] **Functionality:** Does the code do what it claims?
- [ ] **Standards:** Does it follow the project instructions?
- [ ] **Tests:** Are there adequate tests? Do they pass?
- [ ] **Performance:** Are there obvious performance issues?
- [ ] **Security:** Any security concerns or exposed secrets?
- [ ] **Documentation:** Is it clear? Are comments helpful?
- [ ] **Dependencies:** Any unnecessary new dependencies?
- [ ] **Breaking Changes:** Clearly documented if present?

### 4. Review Feedback

**Give constructive feedback:**
- Suggest improvements, don't demand changes
- Explain why a change is needed
- Offer alternative solutions when appropriate
- Praise good code and smart solutions

**Request Changes:**
- Use "Request Changes" for blocking issues
- Use "Comment" for suggestions
- Use "Approve" when satisfied

### 5. Merge PR

**Before merging:**
- All CI/CD checks must pass
- At least one approval (or use project-specific rule)
- Branch should be up-to-date with `main`/`develop`
- Squash related commits if history is messy

**Merge Strategy:**
- Default: Squash and merge (cleaner history)
- For releases: Use merge commit (preserves history)
- Feature branches: Squash and merge

**Delete branch after merge** to keep repository clean.

## Commit Best Practices

### Atomic Commits
- One logical change per commit
- Don't mix refactoring with feature additions
- Easier to review, revert, and understand history

**Good:**
```
commit 1: feat(api): add todo filtering endpoint
commit 2: test(api): add tests for filtering
commit 3: docs(api): document filtering parameters
```

**Avoid:**
```
commit 1: feat(api): add filtering, fix error handling, update docs, upgrade dependencies
```

### Commit Frequency
- Commit after completing a logical unit of work
- Not too frequent (every line change) and not too rare (entire feature in one commit)
- Aim for ~10-30 line changes per commit on average

### Rewriting History

**Don't rewrite public history** (commits already pushed to shared branches).

**Rewrite local history before pushing:**
```bash
# Fix last commit message
git commit --amend --no-edit

# Squash last 3 commits
git rebase -i HEAD~3

# Don't push after amending; force push is risky
```

## Handling Merge Conflicts

1. **Update local branch:** `git fetch origin` then `git rebase origin/main`
2. **Resolve conflicts:** Edit files, remove conflict markers
3. **Mark resolved:** `git add filename`
4. **Continue rebase:** `git rebase --continue` or `git merge --continue`
5. **Test thoroughly** after resolving conflicts
6. **Push:** `git push origin feature/branch-name`

## Local Development Workflow

```bash
# 1. Create and checkout feature branch
git checkout -b feature/my-feature

# 2. Make changes, commit incrementally
git add .
git commit -m "feat(scope): description"

# 3. Fetch latest changes from main
git fetch origin

# 4. Rebase onto latest main (keep history clean)
git rebase origin/main

# 5. Push to remote
git push origin feature/my-feature

# 6. Create PR via GitHub interface

# 7. After approval and merge, delete local branch
git checkout main
git pull origin main
git branch -d feature/my-feature
```

## Troubleshooting

**Accidentally committed to wrong branch:**
```bash
git reset --soft HEAD~1  # Undo commit, keep changes
git checkout correct-branch
git commit -m "message"
```

**Need to revert a merged commit:**
```bash
git revert <commit-hash>  # Creates a new commit that undoes changes
git push origin main
```

**Lost commits (check reflog):**
```bash
git reflog
git checkout <commit-hash>  # Recover lost commit
```
