# 67.py - bisect: maintain sorted lists
import bisect

data = [1, 3, 4, 7]
bisect.insort(data, 5)
print(data)
print('Index to insert 6:', bisect.bisect_left(data, 6))
