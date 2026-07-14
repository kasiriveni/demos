#!/bin/bash
# translator.sh - Translate text to different languages
# Usage: ./translator.sh [language] [input_file]

LANGUAGE="${1:-Spanish}"
INPUT_FILE="${2}"
TEXT=""

if [ -z "$INPUT_FILE" ]; then
    # Read from stdin or command line
    if [ -t 0 ]; then
        echo "Translate to $LANGUAGE"
        echo "Enter text (press Ctrl+D when done):"
        TEXT=$(cat)
    else
        TEXT=$(cat)
    fi
else
    if [ ! -f "$INPUT_FILE" ]; then
        echo "❌ File not found: $INPUT_FILE"
        exit 1
    fi
    TEXT=$(cat "$INPUT_FILE")
fi

if [ -z "$TEXT" ]; then
    echo "❌ No text provided"
    exit 1
fi

echo "🌍 Translating to: $LANGUAGE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

claude --system "You are a professional translator.
Translate the provided text accurately to $LANGUAGE while:
- Preserving tone and meaning
- Using natural language
- Maintaining formatting
- Handling technical terms appropriately" \
--temperature 0.1 \
--max-tokens 2000 \
"Translate this text to $LANGUAGE:

$TEXT"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Translation complete"
