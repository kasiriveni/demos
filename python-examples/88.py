# 88.py - timeit: measure small code snippets
import timeit

print(timeit.timeit("sum(range(100))", number=1000))
