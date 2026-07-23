# 24.py - Return Multiple Values
# Python can return multiple values as a tuple.

def min_max(numbers):
    return min(numbers), max(numbers) , sum(numbers)

lo, hi, bye = min_max([3, 1, 4, 1, 5, 9, 2, 6])
print(f"Min: {lo}, Max: {hi}, Sum: {bye}")
