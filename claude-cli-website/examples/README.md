# Claude CLI Examples

This directory contains practical, ready-to-use shell scripts that demonstrate Claude CLI capabilities.

## Quick Start

1. Make scripts executable:
```bash
chmod +x *.sh
```

2. Set your API key:
```bash
export ANTHROPIC_API_KEY=your_key_here
```

3. Run any script:
```bash
./code-reviewer.sh app.js
```

## Available Scripts

### 1. code-reviewer.sh
**Purpose**: Review code for quality, bugs, security, and improvements

**Usage**:
```bash
./code-reviewer.sh <file>
```

**Examples**:
```bash
./code-reviewer.sh app.js
./code-reviewer.sh utils.py
./code-reviewer.sh main.rs
```

**Output**:
- Performance analysis
- Security vulnerabilities
- Code style issues
- Potential bugs
- Improvement suggestions

---

### 2. doc-generator.sh
**Purpose**: Automatically generate documentation from code

**Usage**:
```bash
./doc-generator.sh <file> [output_file]
```

**Examples**:
```bash
./doc-generator.sh app.js
./doc-generator.sh api.py docs.md
./doc-generator.sh utils.js > documentation.md
```

**Output**:
- Function documentation
- Usage examples
- Parameter descriptions
- Important notes
- Markdown formatted

---

### 3. git-commit-helper.sh
**Purpose**: Generate meaningful git commit messages from staged changes

**Usage**:
```bash
# Stage your changes first
git add .

# Then run the script
./git-commit-helper.sh
```

**Workflow**:
```bash
# Make changes
echo "console.log('hello')" >> app.js

# Stage changes
git add app.js

# Generate commit message
./git-commit-helper.sh

# Use the output in your commit
git commit -m "Your generated message"
```

**Output**:
- Professional commit message
- Follows conventional commits
- Emoji for quick identification
- Concise but descriptive

---

### 4. log-analyzer.sh
**Purpose**: Analyze application logs to identify issues

**Usage**:
```bash
./log-analyzer.sh [log_file] [number_of_lines]
```

**Examples**:
```bash
# Analyze last 50 lines of app.log
./log-analyzer.sh app.log

# Analyze last 100 lines
./log-analyzer.sh app.log 100

# Analyze error.log
./log-analyzer.sh error.log 50

# Pipe directly from running app
tail -f app.log | head -100 > temp.log
./log-analyzer.sh temp.log 100
```

**Output**:
- Issue summary
- Error identification
- Root cause analysis
- Recommended actions
- Severity level

---

### 5. sql-optimizer.sh
**Purpose**: Optimize SQL queries for better performance

**Usage**:
```bash
./sql-optimizer.sh <query_file> [schema_file]
```

**Examples**:
```bash
# Optimize single query
./sql-optimizer.sh slow_query.sql

# Provide database schema for context
./sql-optimizer.sh slow_query.sql schema.sql

# Create a test query file
echo "SELECT * FROM users WHERE age > 30;" > query.sql
./sql-optimizer.sh query.sql
```

**Output**:
- Performance analysis
- Specific optimization suggestions
- Optimized query
- Estimated improvement
- Index recommendations

---

### 6. translator.sh
**Purpose**: Translate text to different languages

**Usage**:
```bash
./translator.sh [language] [input_file]
```

**Examples**:
```bash
# Translate from stdin
echo "Hello, how are you?" | ./translator.sh Spanish

# Translate a file
./translator.sh French document.txt

# Interactive mode
./translator.sh German < text.txt

# Various languages
./translator.sh Japanese README.md
./translator.sh Mandarin article.txt
./translator.sh Portuguese message.txt
```

**Output**:
- Accurate translation
- Natural language
- Preserved formatting
- Proper terminology

---

## Advanced Usage

### Combine Scripts with Pipes

```bash
# Review code and save to file
./code-reviewer.sh app.js > review.txt

# Generate docs and review them
./doc-generator.sh app.js && ./code-reviewer.sh documentation.md
```

### Process Multiple Files

```bash
# Review all JavaScript files
for file in *.js; do
  echo "=== Reviewing $file ==="
  ./code-reviewer.sh "$file"
  echo ""
done
```

### Automate Workflow

```bash
#!/bin/bash
# Complete workflow: review, document, and commit

FILE="$1"

# Review code
echo "Step 1: Reviewing code..."
./code-reviewer.sh "$FILE"

# Generate docs
echo "Step 2: Generating documentation..."
./doc-generator.sh "$FILE" "docs_$FILE.md"

# Stage changes
git add "$FILE" "docs_$FILE.md"

# Generate commit message
echo "Step 3: Generating commit message..."
./git-commit-helper.sh
```

### Schedule Regular Analysis

```bash
# Add to crontab
0 9 * * * cd /path/to/scripts && ./log-analyzer.sh /var/log/app.log > daily_analysis.txt

# Run weekly SQL optimization check
0 3 * * 0 cd /path/to/scripts && ./sql-optimizer.sh queries/main_query.sql > weekly_optimization.txt
```

## Tips & Tricks

### Performance Optimization

Use the `--temperature` flag to control response characteristics:

```bash
# Consistent, accurate responses (0.0-0.2)
./code-reviewer.sh app.js --temperature 0.1

# Creative suggestions (0.7-1.0)
./translator.sh Portuguese --temperature 0.8
```

### Token Monitoring

Add `--show-tokens` to see how many tokens are used:

```bash
./doc-generator.sh large_file.js --show-tokens
```

### Error Handling

Make scripts robust:

```bash
#!/bin/bash
set -e  # Exit on error
set -u  # Exit on undefined variable

# Your script code here
./code-reviewer.sh "$1" || {
    echo "Error: Code review failed"
    exit 1
}
```

### Batch Processing

```bash
#!/bin/bash
# Process all Python files

for file in *.py; do
    echo "Processing: $file"
    ./code-reviewer.sh "$file" > "review_$file.txt"
    echo "✓ Complete"
done
```

## Troubleshooting

### Script Permission Denied
```bash
chmod +x *.sh
```

### API Key Not Set
```bash
export ANTHROPIC_API_KEY=your_key_here
# Or for Windows PowerShell:
$env:ANTHROPIC_API_KEY = "your_key_here"
```

### File Not Found
Make sure the file exists:
```bash
ls -la filename
./code-reviewer.sh filename
```

### Rate Limiting
If you get rate limit errors:
- Wait a few minutes before trying again
- Use Haiku model for faster processing
- Reduce the amount of code/logs being analyzed

## Customization

You can customize these scripts by editing them:

1. **Change system prompts**: Modify the `--system` text
2. **Adjust temperature**: Change the `--temperature` value
3. **Set max tokens**: Modify `--max-tokens` parameter
4. **Use different models**: Add `--model` parameter

Example customization:
```bash
# Original
claude --system "You are a code reviewer"

# Customized
claude --system "You are a strict code reviewer who focuses on security" \
       --model claude-3-5-opus-20250514 \
       --temperature 0
```

## Integration with Other Tools

### GitHub Actions
```yaml
- name: Review PR Code
  run: ./code-reviewer.sh ${{ github.event.pull_request.head.sha }}
```

### Pre-commit Hook
```bash
# .git/hooks/pre-commit
#!/bin/bash
./code-reviewer.sh $(git diff --cached --name-only --diff-filter=ACM | head -1)
```

### Development Workflow
```bash
# Automatically run on file save
while true; do
  inotifywait -e modify *.js && ./code-reviewer.sh $_
done
```

## Contributing

Have ideas for new scripts? Feel free to create them following the same pattern:

1. Clear, descriptive name
2. Usage comment at the top
3. Error handling
4. User-friendly output
5. Documentation

## Resources

- [Claude API Documentation](https://docs.anthropic.com)
- [Prompt Engineering Guide](https://docs.anthropic.com/guides/prompt-engineering)
- [Shell Scripting Guide](https://www.gnu.org/software/bash/manual/)

---

**Happy scripting! 🚀**
