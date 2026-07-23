# 27.py - Dict and Set Comprehensions
# Same idea as list comprehensions, but for dicts and sets.

# Dict comprehension
squares = {x: x ** 2 for x in range(5)}
print(squares)

# Invert a dict
inv = {v: k for k, v in squares.items()}
print(inv)

# Set comprehension

unique_lengths = {len(word) for word in ["hi", "hello", "hey", "yo"]}
print(unique_lengths)


print(["hi", "hello", "hey", "yo"])
