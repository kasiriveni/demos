#!/usr/bin/env bash
# Convenience script to set the repo's git hooks path to .github/hooks
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOKS_DIR="$REPO_ROOT/.github/hooks"

if [ ! -d "$HOOKS_DIR" ]; then
  echo "Hooks directory not found: $HOOKS_DIR"
  exit 1
fi

git config core.hooksPath "$HOOKS_DIR"
echo "Git hooks path set to $HOOKS_DIR"
