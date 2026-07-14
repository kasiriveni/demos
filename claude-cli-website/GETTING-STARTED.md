# 🚀 Claude CLI Master Guide - Getting Started

Welcome! You now have a complete, comprehensive Claude CLI learning platform.

## 📂 Project Location
```
c:\Users\Yuva\Desktop\AI\claude-cli-website\
```

## 🎯 Three Ways to Learn

### 1️⃣ Interactive Website (Recommended)
**Best for**: Visual learners, comprehensive learning

```bash
# Open the website in your browser:
# Windows: start c:\Users\Yuva\Desktop\AI\claude-cli-website\index.html
# Or double-click: index.html in File Explorer
```

**Features**:
- 5 learning levels from beginner to advanced
- Copy-paste code examples
- Interactive navigation
- Dark theme optimized for long sessions
- Mobile responsive

### 2️⃣ Quick Reference Cheat Sheet
**Best for**: Quick lookups, remembering commands

```bash
# Navigate to the folder
cd c:\Users\Yuva\Desktop\AI\claude-cli-website

# View quick reference
./claude-cheatsheet.sh cheatsheet

# View examples
./claude-cheatsheet.sh examples

# View best practices
./claude-cheatsheet.sh best-practices

# View troubleshooting
./claude-cheatsheet.sh troubleshooting

# View everything
./claude-cheatsheet.sh all
```

### 3️⃣ Hands-On Example Scripts
**Best for**: Learning by doing, practical applications

```bash
cd examples

# Make scripts executable
chmod +x *.sh

# Try examples
./code-reviewer.sh <file.js>           # Review code
./doc-generator.sh <file.js>           # Generate docs
./git-commit-helper.sh                 # Generate commits
./log-analyzer.sh <logfile>            # Analyze logs
./sql-optimizer.sh <query.sql>         # Optimize SQL
./translator.sh Spanish < text.txt     # Translate
```

## 📚 What's Included

### Website (`index.html`)
- **Home**: Overview and features
- **Beginner** 🟢: Installation, basic commands, flags
- **Intermediate** 🟡: Context, prompts, models, batch processing
- **Advanced** 🔴: Workflows, tools, optimization
- **Examples** 💡: Real-world use cases

### Documentation
- **README.md**: Full learning guide with best practices
- **examples/README.md**: Detailed guide for each script

### Tools
- **claude-cheatsheet.sh**: Interactive reference with 4 topics
- **6 Example Scripts**: Ready-to-use utilities

## ⚡ Quick Start (5 minutes)

### Step 1: Install Claude CLI
```bash
npm install -g @anthropic-ai/claude-cli
claude --version
```

### Step 2: Set API Key
```bash
# Windows (PowerShell)
$env:ANTHROPIC_API_KEY = "your_api_key_here"

# Windows (Command Prompt)
set ANTHROPIC_API_KEY=your_api_key_here

# Mac/Linux
export ANTHROPIC_API_KEY=your_api_key_here
```

### Step 3: Test Installation
```bash
claude "Hello, Claude! What can you help with?"
```

### Step 4: Try Example Script
```bash
cd c:\Users\Yuva\Desktop\AI\claude-cli-website\examples
chmod +x code-reviewer.sh

# Create a test file
echo "function hello() { return 42 }" > test.js

# Review it
./code-reviewer.sh test.js
```

## 📖 Learning Path

### Beginner (Day 1 - 30 minutes)
1. Open the website (`index.html`)
2. Read "Beginner" section
3. Try commands in your terminal:
   ```bash
   claude "What is AI?"
   claude --list-models
   claude --help
   ```
4. Review cheat sheet:
   ```bash
   ./claude-cheatsheet.sh cheatsheet
   ```

### Intermediate (Day 2 - 1-2 hours)
1. Read "Intermediate" section on website
2. Try practical examples
3. Run example scripts
4. Create a simple workflow:
   ```bash
   # Review your code
   ./examples/code-reviewer.sh app.js
   ```

### Advanced (Day 3 - 2-3 hours)
1. Read "Advanced" section
2. Study complex workflows
3. Build custom scripts
4. Optimize for your needs

## 🎨 Website Features

### Navigation
- **Click menu items** to jump to sections
- **Keyboard shortcuts**: Arrow Right/Left for next/previous
- **Responsive design**: Works on desktop, tablet, mobile

### Code Examples
- **Blue "📋 Copy" button** appears on each code block
- **Click to copy** - automatically copies code to clipboard
- **Dark theme** - easy on the eyes

### Search
Built-in search for finding topics (use browser Find: Ctrl+F)

## 💻 Command Examples

### Basic Usage
```bash
# Simple question
claude "What is Claude CLI?"

# Multi-line prompt
claude "Explain these concepts:
1. APIs
2. REST
3. GraphQL"

# From file
claude "Summarize this:" < document.txt
cat code.js | claude "Review this code"
```

### With Parameters
```bash
# Use specific model
claude --model claude-3-5-haiku-20241022 "Quick question"

# Set creativity level
claude --temperature 0.2 "Accurate answer"
claude --temperature 0.9 "Creative idea"

# Show token usage
claude --show-tokens "Your prompt"

# JSON output
claude --json "Generate data"

# System prompt
claude --system "You are a Python expert" "Write code"
```

### Advanced
```bash
# Save conversation
claude --conversation my-chat "First message"
claude --conversation my-chat "Follow-up"

# Continue conversation
claude --show-history my-chat

# Save output
claude "Generate code" > output.txt
claude "More code" >> output.txt
```

## 🔧 Using Example Scripts

### 1. Code Reviewer
```bash
./examples/code-reviewer.sh app.js
```
- Analyzes code quality
- Finds bugs and issues
- Suggests improvements

### 2. Documentation Generator
```bash
./examples/doc-generator.sh app.js docs.md
```
- Generates documentation
- Creates usage examples
- Markdown format

### 3. Git Commit Helper
```bash
git add your_changes
./examples/git-commit-helper.sh
```
- Generates meaningful commit messages
- Follows best practices
- Includes emoji

### 4. Log Analyzer
```bash
./examples/log-analyzer.sh app.log 100
```
- Analyzes error logs
- Finds root causes
- Suggests fixes

### 5. SQL Optimizer
```bash
./examples/sql-optimizer.sh slow_query.sql schema.sql
```
- Optimizes queries
- Suggests indexes
- Shows performance gain

### 6. Translator
```bash
echo "Hello, how are you?" | ./examples/translator.sh Spanish
./examples/translator.sh French document.txt
```
- Translates text
- Maintains formatting
- Natural language

## 🎓 Files to Study

1. **For Learning**: `README.md`
   - Complete guide with best practices
   - Installation instructions
   - Command reference

2. **For Quick Lookup**: `claude-cheatsheet.sh`
   - Commands grouped by category
   - Common patterns
   - Troubleshooting

3. **For Hands-On**: `examples/README.md`
   - Detailed guide for each script
   - Usage patterns
   - Integration examples

## 📱 Website Keyboard Shortcuts

- **→** (Arrow Right): Next section
- **←** (Arrow Left): Previous section
- **Ctrl+F**: Search content

## 🆘 Troubleshooting

### "Claude CLI not found"
```bash
npm install -g @anthropic-ai/claude-cli
```

### "API key not set"
```bash
# Check if set
echo $ANTHROPIC_API_KEY

# Set it
export ANTHROPIC_API_KEY=your_key_here
```

### "Permission denied" on scripts
```bash
chmod +x *.sh
chmod +x examples/*.sh
```

### "Model not found"
```bash
# List available models
claude --list-models

# Use full model name
claude --model claude-3-5-sonnet-20241022 "prompt"
```

## 📊 Next Steps

1. ✅ **Setup**: Install Claude CLI and set API key
2. ✅ **Learn**: Read beginner section
3. ✅ **Practice**: Try 3 commands
4. ✅ **Build**: Try example scripts
5. ✅ **Create**: Build your first workflow
6. ✅ **Master**: Read advanced section
7. ✅ **Share**: Show friends your scripts

## 🎯 Common Workflows

### Workflow 1: Code Quality Pipeline
```bash
./examples/code-reviewer.sh app.js
./examples/doc-generator.sh app.js
git add .
./examples/git-commit-helper.sh
```

### Workflow 2: Log Analysis & Debugging
```bash
./examples/log-analyzer.sh app.log 100
```

### Workflow 3: Database Optimization
```bash
./examples/sql-optimizer.sh queries/main.sql schema.sql
```

### Workflow 4: Documentation Generation
```bash
for file in src/*.js; do
  ./examples/doc-generator.sh "$file" "docs/$(basename $file).md"
done
```

## 📚 Additional Resources

- **Official Docs**: https://docs.anthropic.com
- **Prompt Engineering**: https://docs.anthropic.com/guides/prompt-engineering
- **Model Info**: https://docs.anthropic.com/claude/models

## 💡 Tips for Success

1. **Start Small**: Begin with simple queries
2. **Read Examples**: Study the practical examples
3. **Experiment**: Try different temperatures and models
4. **Monitor Tokens**: Use `--show-tokens` to see cost
5. **Create Scripts**: Build tools for your workflow
6. **Share Knowledge**: Help others learn

## 🎉 You're Ready!

You now have everything you need to master Claude CLI:
- ✅ Interactive learning website
- ✅ Quick reference cheat sheet
- ✅ 6 ready-to-use example scripts
- ✅ Comprehensive documentation
- ✅ Real-world examples

### Start Here:
1. Open `index.html` in browser
2. Read the beginner section
3. Try a command in terminal
4. Run an example script

**Happy learning! 🚀**

---

## File Location Reference

```
claude-cli-website/
├── index.html                 ← Open this first
├── README.md                  ← Full guide
├── styles.css                 ← Website styling
├── script.js                  ← Website interactivity
├── package.json               ← Configuration
├── claude-cheatsheet.sh       ← Quick reference
└── examples/
    ├── README.md              ← Examples guide
    ├── code-reviewer.sh       ← Use these
    ├── doc-generator.sh       ↓
    ├── git-commit-helper.sh   ↓
    ├── log-analyzer.sh        ↓
    ├── sql-optimizer.sh       ↓
    └── translator.sh          ← 6 tools
```

### Quick Commands
```bash
# Navigate to project
cd c:\Users\Yuva\Desktop\AI\claude-cli-website

# Open website
start index.html

# View cheat sheet
./claude-cheatsheet.sh all

# Try examples
cd examples
./code-reviewer.sh test.js
```

**Enjoy your Claude CLI journey!** ⚡
