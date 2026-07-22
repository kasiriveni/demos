# 44.py - Generators
# Functions that yield values lazily, saving memory.

def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num, end=" ")
print()

# Generator expression - like a list comprehension but lazy
gen = (x ** 2 for x in range(1000000))
print(next(gen), next(gen), next(gen))
