# 49.py - Walrus Operator :=
# Assign and return a value in a single expression (Python 3.8+).

# Read until a sentinel value
while (line := input("Say something (q to quit): ")) != "q":
    print(f"You said: {line}")

# In a list comprehension
import random
numbers = [random.randint(1, 100) for _ in range(10)]
filtered = [n for n in numbers if (squared := n ** 2) < 1000]
print("Filtered:", filtered)
