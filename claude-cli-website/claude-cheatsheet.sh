#!/bin/bash
# Claude CLI Cheat Sheet - Save as claude-cheatsheet.sh
# Usage: ./claude-cheatsheet.sh [command]

show_cheatsheet() {
    cat << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║             CLAUDE CLI CHEAT SHEET                            ║
╚════════════════════════════════════════════════════════════════╝

1️⃣  INSTALLATION & SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  npm install -g @anthropic-ai/claude-cli
  claude --version
  export ANTHROPIC_API_KEY=your_key

2️⃣  BASIC COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  claude "Your question"
  claude --help
  claude --list-models
  cat file.txt | claude "Process this"

3️⃣  MODEL SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  --model claude-3-5-opus-20250514      (Most capable)
  --model claude-3-5-sonnet-20241022    (Balanced)
  --model claude-3-5-haiku-20241022     (Fastest)

4️⃣  PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  --temperature 0.0                    (Deterministic)
  --temperature 0.7                    (Balanced)
  --temperature 1.0                    (Creative)
  --max-tokens 1000                    (Limit length)
  --show-tokens                        (Show token count)

5️⃣  SYSTEM PROMPTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  --system "You are a Python expert"
  --system-file prompt.txt
  --system "Be concise and clear"

6️⃣  CONVERSATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  --conversation name                  (Start/continue)
  --list-conversations                 (List all)
  --show-history name                  (View history)

7️⃣  OUTPUT OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  > output.txt                         (Save output)
  >> output.txt                        (Append)
  | grep "pattern"                     (Filter)
  --json                               (JSON format)

8️⃣  PRACTICAL EXAMPLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # Code review
  claude --system "Review code" "$(cat app.js)"

  # Git diff analysis
  git diff | claude "Explain these changes"

  # Log debugging
  tail -20 error.log | claude "Diagnose"

  # Batch processing
  for file in *.txt; do
    claude "Summarize:" < "$file" > "summary_$file"
  done

9️⃣  ENVIRONMENT VARIABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ANTHROPIC_API_KEY              (Required)
  CLAUDE_MODEL                   (Default model)
  CLAUDE_TEMPERATURE             (Default temperature)

🔟  TIPS & TRICKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Use Haiku for simple tasks (fast & cheap)
  ✓ Use Opus for complex reasoning
  ✓ Set temperature=0 for accuracy
  ✓ Set temperature=0.7+ for creativity
  ✓ Monitor tokens with --show-tokens
  ✓ Use parallel for batch processing
  ✓ Combine with pipes for powerful workflows
  ✓ Save useful commands in aliases

EOF
}

show_examples() {
    cat << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║             PRACTICAL EXAMPLES                                ║
╚════════════════════════════════════════════════════════════════╝

1. CODE REVIEW
──────────────────────────────────────────────────────────────────
claude --system "Expert code reviewer" \
  --temperature 0.2 \
  "Review this code for bugs and improvements: $(cat app.js)"

2. DOCUMENTATION
──────────────────────────────────────────────────────────────────
claude --system "Professional documentation writer" \
  "Generate comprehensive documentation for: $(cat src/main.js)"

3. GIT COMMIT MESSAGE
──────────────────────────────────────────────────────────────────
DIFF=$(git diff --staged)
claude --system "Write clear commit messages" \
  --temperature 0.1 \
  "Create a commit message for: $DIFF"

4. DEBUGGING LOGS
──────────────────────────────────────────────────────────────────
tail -50 app.log | claude --system "Debug expert" \
  "What errors are in these logs?"

5. SQL QUERY OPTIMIZATION
──────────────────────────────────────────────────────────────────
claude --system "Database optimization expert" \
  "Optimize this query: $(cat slow_query.sql)"

6. LANGUAGE TRANSLATION
──────────────────────────────────────────────────────────────────
claude --system "Professional translator" \
  "Translate to Spanish: Hello, how are you?"

7. TEXT SUMMARIZATION
──────────────────────────────────────────────────────────────────
cat long_article.txt | claude \
  "Summarize this article in 3 bullet points"

8. API ANALYSIS
──────────────────────────────────────────────────────────────────
curl -s https://api.example.com/data | claude \
  "Explain this JSON response structure"

9. BATCH PROCESSING
──────────────────────────────────────────────────────────────────
for file in *.md; do
  claude "Improve this writing: $(cat $file)" > "improved_$file"
done

10. CONTINUOUS CONVERSATION
──────────────────────────────────────────────────────────────────
# Start session
claude --conversation debug "I'm getting 404 errors"
claude --conversation debug "They happen in login page"
claude --conversation debug "Only after update"
claude --show-history debug

EOF
}

show_best_practices() {
    cat << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║             BEST PRACTICES                                    ║
╚════════════════════════════════════════════════════════════════╝

PERFORMANCE
───────────────────────────────────────────────────────────────
✓ Use Haiku for simple QA (fastest & cheapest)
✓ Use Sonnet for balanced performance
✓ Use Opus for complex reasoning
✓ Monitor tokens with --show-tokens
✓ Set max-tokens appropriately

QUALITY
───────────────────────────────────────────────────────────────
✓ Provide clear context in system prompt
✓ Use examples in your prompt
✓ Break complex tasks into steps
✓ Validate outputs before using
✓ Set temperature=0 for consistency

COST OPTIMIZATION
───────────────────────────────────────────────────────────────
✓ Use cheapest model suitable for task
✓ Reduce max-tokens if possible
✓ Batch similar queries together
✓ Use conversations to cache context
✓ Limit output length with prompting

AUTOMATION
───────────────────────────────────────────────────────────────
✓ Create reusable scripts
✓ Use functions for common tasks
✓ Implement error handling
✓ Add logging for debugging
✓ Use set -e for safety in scripts

ERROR HANDLING
───────────────────────────────────────────────────────────────
#!/bin/bash
set -e  # Exit on error

if ! command -v claude &> /dev/null; then
    echo "Claude CLI not installed"
    exit 1
fi

if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "API key not set"
    exit 1
fi

claude "Your prompt" || {
    echo "Command failed with exit code $?"
    exit 1
}

EOF
}

show_troubleshooting() {
    cat << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║             TROUBLESHOOTING                                   ║
╚════════════════════════════════════════════════════════════════╝

PROBLEM: Command not found
──────────────────────────────────────────────────────────────
Solution:
  npm install -g @anthropic-ai/claude-cli
  OR check if npm bin is in PATH

PROBLEM: API Key not recognized
──────────────────────────────────────────────────────────────
Solution:
  export ANTHROPIC_API_KEY=your_actual_key
  echo $ANTHROPIC_API_KEY  # Verify it's set
  # On Windows: $env:ANTHROPIC_API_KEY="key"

PROBLEM: Model not found
──────────────────────────────────────────────────────────────
Solution:
  claude --list-models  # Check available models
  Use full model ID: claude-3-5-sonnet-20241022

PROBLEM: Timeout errors
──────────────────────────────────────────────────────────────
Solution:
  Try with shorter prompt
  Reduce max-tokens
  Use faster model (Haiku)

PROBLEM: High token usage
──────────────────────────────────────────────────────────────
Solution:
  Use --show-tokens to see count
  Reduce prompt size
  Use Haiku instead of Opus
  Limit max-tokens

PROBLEM: Inconsistent outputs
──────────────────────────────────────────────────────────────
Solution:
  Set temperature to 0 for deterministic output
  Be more specific in your prompt
  Add examples to your prompt

EOF
}

# Main menu
case "${1:-menu}" in
    cheatsheet)
        show_cheatsheet
        ;;
    examples)
        show_examples
        ;;
    best-practices)
        show_best_practices
        ;;
    troubleshooting)
        show_troubleshooting
        ;;
    all)
        show_cheatsheet
        echo ""
        show_examples
        echo ""
        show_best_practices
        echo ""
        show_troubleshooting
        ;;
    *)
        cat << 'EOF'
Claude CLI Cheat Sheet Tool

Usage: ./claude-cheatsheet.sh [command]

Commands:
  cheatsheet       Show quick reference
  examples         Show practical examples
  best-practices   Show best practices
  troubleshooting  Show troubleshooting tips
  all              Show everything

Examples:
  ./claude-cheatsheet.sh cheatsheet
  ./claude-cheatsheet.sh examples
  ./claude-cheatsheet.sh all

EOF
        ;;
esac
