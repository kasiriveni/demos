# 53.py - Itertools basics: product, permutations, combinations, accumulate
import itertools
from itertools import product, permutations, combinations, accumulate

items = [1, 2, 3]
print(list(product(items, repeat=2)))         # Cartesian product
print(list(permutations(items, 2)))           # order matters
print(list(combinations(items, 2)))           # order doesn't matter

# accumulate: running totals (or custom function)
print(list(accumulate([1, 2, 3, 4])))
