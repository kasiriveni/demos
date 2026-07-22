# 51.py - Regular Expressions
# Pattern matching with the re module.

import re

text = "Order #1234 was placed on 2024-01-15."

# Find digits
digits = re.findall(r"\d+", text)
print("Digits:", digits)

# Search for a pattern
match = re.search(r"Order #(\d+)", text)
if match:
    print("Order number:", match.group(1))

# Replace
print(re.sub(r"\d{4}-\d{2}-\d{2}", "[DATE]", text))
