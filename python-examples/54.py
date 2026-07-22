# 54.py - Functools: lru_cache and partial
from functools import lru_cache, partial

# lru_cache memoizes expensive calls
@lru_cache(maxsize=128)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print([fib(i) for i in range(20)])

# partial: freeze some function arguments
def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)
print(square(5), cube(2))
