---
name: gitcommit
description: Use when writing git commit messages, generating commit messages, or helping with git commits. Always produce commit messages that follow the Conventional Commits specification.
---

<!-- Tip: Use /create-skill in chat to generate content with agent assistance -->

# Git Commit Messages

Always write commit messages using the Conventional Commits standard.

## Required format

```text
type(scope): short summary
```

Scope is optional:

```text
type: short summary
```

## Rules

- Use a valid Conventional Commits type such as `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`, `perf`, or `revert`.
- Keep the summary short, specific, and in imperative mood.
- Use lowercase for the type and summary unless a proper noun requires capitals.
- Do not end the summary with a period.
- Use `!` after the type or scope for breaking changes, and include a `BREAKING CHANGE:` footer when needed.

## Examples

```text
feat: add animated project filter
fix(navigation): prevent mobile menu from staying open
docs: update setup instructions
refactor(projects): simplify card rendering logic
```

## Guidance

- If the user asks for a commit message, return a Conventional Commits message.
- If the user asks for a git commit command, generate the message in Conventional Commits format.
- If multiple changes are included, choose the type that best represents the main user-facing change.
