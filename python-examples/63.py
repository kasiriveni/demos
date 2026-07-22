# 63.py - concurrent.futures: thread and process pools
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def compute(x):
    return x * x

with ThreadPoolExecutor() as ex:
    print(list(ex.map(compute, range(5))))

with ProcessPoolExecutor() as ex:
    print(list(ex.map(compute, range(5, 10))))
