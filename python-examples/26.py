# 26.py - List Comprehensions
# Concise way to create lists from iterables.

squares = [x ** 2 for x in range(10)]
print(squares)

evens = [x for x in range(20) if x % 2 == 0]
print(evens)

# Nested comprehension - 2D matrix
matrix = [[i * 3 + j for j in range(3)] for i in range(3)]
print(matrix)
