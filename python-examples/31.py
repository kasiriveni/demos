# 31.py - Raising Exceptions
# Use raise to signal that something went wrong.

def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative.")
    return age

try:
    set_age(-5)
except ValueError as msg:
    print("Invalid input:", msg)
