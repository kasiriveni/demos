# 19.py - Sets
# Unordered, unique elements. Great for membership tests and dedup.

nums = {1, 2, 3, 3, 4, 4, 5}
print(nums)        # {1, 2, 3, 4, 5} - duplicates removed

nums.add(6)
nums.discard(1)
print(3 in nums)   # True

# Set operations
a = {1, 2, 3}
b = {3, 4, 5}
print(a | b)        # union
print(a & b)        # intersection
print(a - b)        # difference
