# 29.py - Map, Filter, Reduce
# Functional-style tools for transforming iterables.

nums = [1, 2, 3, 4, 5]

# map: apply a function to each element
squared = list(map(lambda x: x ** 2, nums))
print(squared)

# filter: keep elements that pass a test
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)

# reduce: accumulate values (lives in functools)
from functools import reduce
total = reduce(lambda a, b: a + b, nums)
print(total)
