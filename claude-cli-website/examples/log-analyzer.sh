#!/bin/bash
# log-analyzer.sh - Analyze application logs for issues
# Usage: ./log-analyzer.sh [log_file] [lines]

LOG_FILE="${1:-app.log}"
LINES="${2:-50}"

if [ ! -f "$LOG_FILE" ]; then
    echo "❌ Log file not found: $LOG_FILE"
    exit 1
fi

echo "🔍 Analyzing logs from: $LOG_FILE (last $LINES lines)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

tail -n "$LINES" "$LOG_FILE" | claude --system "You are an expert system administrator analyzing application logs.

Provide:
1. Summary of what's happening
2. Any errors or warnings found
3. Root cause analysis
4. Recommended actions
5. Severity level (Critical/High/Medium/Low)

Be specific and actionable." \
--temperature 0.3 \
--show-tokens \
"Analyze these application logs and identify issues:

$(tail -n $LINES $LOG_FILE)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Analysis complete"
