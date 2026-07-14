#!/bin/bash
# doc-generator.sh - Generate documentation for code
# Usage: ./doc-generator.sh <file> [output_file]

if [ -z "$1" ]; then
    echo "Usage: $0 <file> [output_file]"
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "File not found: $1"
    exit 1
fi

OUTPUT="${2:-documentation.md}"

echo "📚 Generating documentation for: $1"
echo "💾 Output will be saved to: $OUTPUT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude --system "Generate professional, comprehensive documentation in Markdown format. Include:
- Overview of what the code does
- Key functions and their purposes
- Usage examples
- Parameters and return values
- Important notes and warnings
- Related concepts

Use clear formatting with headers, code blocks, and lists." \
--temperature 0.3 \
"Generate detailed documentation for this code:

$(cat $1)" > "$OUTPUT"

echo ""
echo "✅ Documentation generated: $OUTPUT"
echo "📄 File size: $(wc -c < $OUTPUT) bytes"
