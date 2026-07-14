#!/bin/bash
# git-commit-helper.sh - Generate conventional commit messages
# Usage: ./git-commit-helper.sh
# Follows: https://www.conventionalcommits.org/

DIFF=$(git diff --staged)

if [ -z "$DIFF" ]; then
    echo "❌ No staged changes found. Please stage changes with: git add"
    exit 1
fi

echo "📝 Analyzing staged changes..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude --system "Generate a professional git commit message following the Conventional Commits specification.

Format: <type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, perf, test, ci, chore, revert
Scopes: backend, frontend, agent-website, cli, docker, deps, api, auth, ui, db

Rules:
- Use imperative mood ('add', 'fix', 'update', NOT 'added', 'fixed')
- Lowercase subject line
- No period at end of subject
- Maximum 50 characters for subject
- Only add optional body/footer if change is complex
- Mark breaking changes with '!' and explain in footer

Examples:
- feat(todos): add filter by completion status
- fix(api): validate todo ID before update
- docs(readme): improve installation guide
- chore(deps): upgrade React to 18.3.0
- refactor(backend): simplify validation logic

Generate ONLY the commit message, nothing else." \
--temperature 0.2 \
--max-tokens 150 \
"Generate a conventional commit message for these changes:

$DIFF"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Copy the message above and use:"
echo "   git commit -m 'paste-message-here'"
echo ""
echo "📚 Learn more: https://www.conventionalcommits.org/"
