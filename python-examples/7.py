# 7.py - Logical Operators
# Combine conditions with and, or, not.

age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive.")

if age < 18 or not has_license:
    print("You cannot drive.")
else:
    print("Conditions passed.")
