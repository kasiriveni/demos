# 66.py - heapq: priority queue (min-heap)
import heapq

nums = [5, 1, 3, 7, 2]
heapq.heapify(nums)
heapq.heappush(nums, 0)
print(heapq.heappop(nums))  # smallest
print(nums)
