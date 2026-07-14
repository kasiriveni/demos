#!/bin/bash
# code-reviewer.sh - Review code quality with Claude CLI
# Usage: ./code-reviewer.sh <file>

if [ -z "$1" ]; then
    echo "Usage: $0 <file>"
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "File not found: $1"
    exit 1
fi

echo "📝 Analyzing code: $1"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude --system "You are an expert code reviewer. Analyze code for:
- Performance issues
- Security vulnerabilities
- Code style and best practices
- Potential bugs
- Readability improvements

Provide specific, actionable feedback." \
--temperature 0.2 \
--show-tokens \
"Review this code and provide detailed feedback:

$(cat $1)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Review complete"
