# 103.py - Decorator with arguments (simple timing)
import time
from functools import wraps


def timed(unit='s'):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            start = time.perf_counter()
            result = fn(*args, **kwargs)
            elapsed = time.perf_counter() - start
            if unit == 'ms':
                elapsed *= 1000
            print(f"{fn.__name__} took {elapsed:.3f}{unit}")
            return result

        return wrapper

    return decorator


@timed(unit='ms')
def compute(n):
    s = 0
    for i in range(n):
        s += i * i
    return s


if __name__ == "__main__":
    print('Result:', compute(100000))
