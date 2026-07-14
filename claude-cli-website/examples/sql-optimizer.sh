#!/bin/bash
# sql-optimizer.sh - Optimize SQL queries for better performance
# Usage: ./sql-optimizer.sh <query_file> [schema_file]

if [ -z "$1" ]; then
    echo "Usage: $0 <query_file> [schema_file]"
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "❌ Query file not found: $1"
    exit 1
fi

QUERY=$(cat "$1")
SCHEMA=""

if [ -f "${2}" ]; then
    SCHEMA="Database Schema:
$(cat $2)

"
fi

echo "⚡ Optimizing SQL query from: $1"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude --system "You are an expert database performance specialist.

Analyze the SQL query and provide:
1. Performance analysis
2. Optimization suggestions with specific changes
3. Explain why each optimization helps
4. Provide the optimized query
5. Estimated performance improvement

Consider indexes, query structure, and best practices." \
--temperature 0.2 \
"$SCHEMA
Optimize this SQL query:

$QUERY"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Optimization analysis complete"
