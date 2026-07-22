# 30.py - Exception Handling
# Catch and handle errors with try/except/finally.

try:
    result = 10 / 0
except ZeroDivisionError as e:
    print("Caught error:", e)
else:
    print("No error occurred.")
finally:
    print("This runs no matter what.")

# Catch multiple exception types
try:
    value = int("abc")
except (ValueError, TypeError) as e:
    print("Conversion failed:", e)
