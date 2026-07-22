# 12.py - String Basics
# Strings are sequences of characters - immutable.

s = "Hello,Python!"

print(s[0])          # H (first char)
print(s[-1])         # ! (last char)
print(s[0:5])        # Hello (slice)
print(len(s))        # 14

# Strings are immutable
# s[0] = "h"  # This would raise TypeError
