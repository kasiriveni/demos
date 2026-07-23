# 28.py - Lambda Functions
# Anonymous, single-expression functions.

square = lambda x: x ** 2
print(square(5))

add = lambda a, b: a + b
print(add(3, 4))

# Often used with sorted, map, filter
pairs = [(1, 2), (3, 1), (5, 0)]
pairs.sort(key=lambda p: p[1])
print(pairs)


def make_incrementor(n):
    return lambda x: x + n

print(make_incrementor(2)(5))  # Output: 7


# def square(x):
#     return x ** 2

print(square(5))  # Output: 25
