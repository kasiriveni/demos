# Claude CLI - Master Guide

A comprehensive learning platform for mastering Claude CLI from beginner to advanced level.

## Overview

This website provides:
- **Beginner Level**: Installation, basic commands, flags, file handling, and output options
- **Intermediate Level**: Conversation context, system prompts, model options, batch processing, error handling
- **Advanced Level**: Custom workflows, tool integration, multi-turn conversations, optimization, CLI tool building
- **Practical Examples**: Ready-to-use scripts and real-world use cases

## Getting Started

### Quick Start
1. Open `index.html` in your web browser
2. Click "Start Learning" or navigate through sections using the menu
3. Read lessons and try examples

### Keyboard Navigation
- **Arrow Right**: Next section
- **Arrow Left**: Previous section
- **Click**: Copy code blocks with the "📋 Copy" button

## Sections

### 🟢 Beginner Level
Perfect for newcomers to Claude CLI.

Topics covered:
1. Installation & Setup
2. Your First Command
3. Basic Flags & Options
4. Reading from Files
5. Output Options

**Time to Complete**: 30 minutes

### 🟡 Intermediate Level
Build real-world workflows and automations.

Topics covered:
1. Conversation Context
2. System Prompts
3. Advanced Model Options
4. Batch Processing
5. Error Handling & Validation

**Time to Complete**: 1-2 hours

### 🔴 Advanced Level
Master sophisticated Claude CLI applications.

Topics covered:
1. Custom Workflows & Scripting
2. Integration with External Tools
3. Multi-Turn Conversations
4. Performance Optimization
5. Building CLI Tools & Utilities

**Time to Complete**: 2-3 hours

### 💡 Practical Examples
Real-world Claude CLI applications:
- Code Review Tool
- Documentation Generator
- Git Commit Message Suggester
- SQL Query Optimizer
- Log Analyzer
- API Response Interpreter

## Installation

### Requirements
- Node.js 18+
- npm or yarn
- ANTHROPIC_API_KEY environment variable

### Install Claude CLI

```bash
# Using npm
npm install -g @anthropic-ai/claude-cli

# Verify installation
claude --version

# Set API key
export ANTHROPIC_API_KEY=your_api_key_here

# On Windows (PowerShell)
$env:ANTHROPIC_API_KEY="your_api_key_here"
```

## Essential Commands

### Basic
```bash
# Simple query
claude "What is Claude CLI?"

# Help
claude --help

# Check version
claude --version
```

### Model Selection
```bash
# Available models
claude --list-models

# Use specific model
claude --model claude-3-5-sonnet-20241022 "Your prompt"

# Use fast model for quick tasks
claude --model claude-3-5-haiku-20241022 "Quick question"
```

### Parameter Control
```bash
# Temperature (0=deterministic, 1=creative)
claude --temperature 0.2 "Code review"
claude --temperature 0.9 "Creative writing"

# Max tokens
claude --max-tokens 2000 "Long response prompt"

# JSON output
claude --json "Generate data"

# Show tokens
claude --show-tokens "Your prompt"
```

### System Prompts
```bash
# Inline system prompt
claude --system "You are a Python expert" "Write a function"

# From file
claude --system-file system-prompt.txt "Your prompt"
```

### Conversations
```bash
# Start conversation
claude --conversation my-chat "First message"

# Continue conversation
claude --conversation my-chat "Follow-up"

# List conversations
claude --list-conversations

# View history
claude --show-history my-chat
```

## Advanced Workflows

### 1. Code Review Pipeline
```bash
#!/bin/bash
claude --system "You are a code reviewer" \
  "Review this code: $(cat app.js)"
```

### 2. Documentation Generator
```bash
#!/bin/bash
claude --system "Generate professional documentation" \
  "Document: $(cat README.md)" > FULL_DOCS.md
```

### 3. Git Integration
```bash
#!/bin/bash
DIFF=$(git diff --staged)
claude --system "Write concise commit messages" \
  "Commit: $DIFF"
```

### 4. Log Analysis
```bash
#!/bin/bash
tail -100 app.log | claude "Find issues in these logs"
```

### 5. Database Optimization
```bash
#!/bin/bash
claude --system "Optimize SQL queries" \
  "Optimize: $(cat query.sql)"
```

## Best Practices

### Performance
1. Use faster models (Haiku) for simple tasks
2. Use Opus for complex reasoning
3. Adjust temperature: 0 for accuracy, 0.7+ for creativity
4. Set appropriate max_tokens to control cost

### Quality
1. Provide context in system prompts
2. Use examples in your prompts
3. Break complex tasks into steps
4. Validate outputs before using

### Cost Optimization
1. Monitor token usage with `--show-tokens`
2. Use conversation caching for repeated queries
3. Batch similar queries together
4. Use faster models when appropriate

## Tips & Tricks

### Pipe Input
```bash
cat file.txt | claude "Process this"
```

### Save Output
```bash
claude "Generate" > output.txt
claude "More" >> output.txt
```

### Combine with Tools
```bash
# Use with grep
claude "Query" | grep "pattern"

# Use with jq
jq '.items[]' data.json | claude "Process"

# Use with git
git log --oneline | claude "Summarize"
```

### Parallel Processing
```bash
cat items.txt | parallel claude "Process: {}"
```

## Example Projects

### Project 1: Code Analyzer
```bash
#!/bin/bash
# analyze.sh
claude --system "Analyze code quality" \
       --temperature 0.2 \
       "Analyze: $(cat $1)"
```

### Project 2: Translation Tool
```bash
#!/bin/bash
# translate.sh
claude --system "Translate accurately" \
       "Translate to $1: $2"
```

### Project 3: API Documentation
```bash
#!/bin/bash
# api-docs.sh
curl -s $1 | claude "Generate API documentation"
```

## Troubleshooting

### API Key Issues
```bash
# Check if API key is set
echo $ANTHROPIC_API_KEY

# Update API key
export ANTHROPIC_API_KEY=your_new_key
```

### Model Not Found
```bash
# List available models
claude --list-models

# Use full model name
claude --model claude-3-5-sonnet-20241022 "prompt"
```

### Token Limits
```bash
# Check token usage
claude --show-tokens "Your prompt"

# Reduce tokens needed
claude --max-tokens 500 "Your prompt"
```

## Resources

- [Claude API Documentation](https://docs.anthropic.com)
- [Claude CLI GitHub](https://github.com/anthropics/anthropic-sdk-python)
- [Prompt Engineering Guide](https://docs.anthropic.com/claude/guides/prompt-engineering)
- [Model Updates](https://docs.anthropic.com/claude/changelog)

## Learning Path

1. **Start**: Beginner section (30 min)
2. **Practice**: Try 3-4 practical examples (1 hour)
3. **Build**: Create your own script (1 hour)
4. **Learn**: Intermediate section (1-2 hours)
5. **Master**: Advanced section (2-3 hours)
6. **Create**: Build a complete project

**Total Time**: 6-8 hours to reach proficiency

## FAQ

**Q: What's the difference between models?**
A: Claude 3.5 Opus is most capable, Sonnet is balanced, Haiku is fastest. Choose based on task complexity.

**Q: Can I use Claude CLI offline?**
A: No, Claude CLI requires API connection to Anthropic's servers.

**Q: How do I save costs?**
A: Use Haiku for simple tasks, batch requests, monitor tokens, use conversation caching.

**Q: Can I use scripts with Claude CLI?**
A: Yes! Create bash scripts that call claude commands for complex workflows.

**Q: How do I handle errors?**
A: Check exit codes, validate API keys, use retry logic, implement timeouts.

## Contributing

Have examples or improvements? Feel free to add them!

## License

MIT License - Feel free to use and share

---

**Happy Learning! 🚀**

For the best experience, read through sections sequentially and try examples as you go. Practice makes perfect!
