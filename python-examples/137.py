# 137.py - Caching patterns: lru_cache, cache, TTL cache
# `functools.lru_cache` and `cache` (3.9+) memoize by args. For a TTL-style
# cache (the result expires after N seconds), you can build one with
# `functools.lru_cache` and a `time` key, or just write a small wrapper.

import functools
import time
from typing import Callable


@functools.lru_cache(maxsize=128)
def fib(n: int) -> int:
    return n if n < 2 else fib(n - 1) + fib(n - 2)


@functools.cache                  # unbounded; like lru_cache(maxsize=None)
def slow_double(x):
    time.sleep(0.001)
    return x * 2


# --- A TTL cache: caches up to N seconds. ---
def ttl_cache(seconds: int = 5, maxsize: int = 128):
    def decorator(fn: Callable):
        cache: dict = {}
        lock = functools.cache(lambda: None)  # placeholder for thread-locals; not thread-safe
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            key = (args, tuple(sorted(kwargs.items())))
            now = time.monotonic()
            entry = cache.get(key)
            if entry and now - entry[0] < seconds:
                return entry[1]
            value = fn(*args, **kwargs)
            cache[key] = (now, value)
            if len(cache) > maxsize:
                # cheap eviction: drop oldest by insertion order
                cache.pop(next(iter(cache)))
            return value
        return wrapper
    return decorator


counter = {"n": 0}


@ttl_cache(seconds=0.1, maxsize=10)
def expensive(x):
    counter["n"] += 1
    return x * x


if __name__ == "__main__":
    print("fib(30) =", fib(30))
    print("fib cache info:", fib.cache_info())

    for v in [1, 2, 3, 1, 2, 3]:
        expensive(v)
    print("first burst calls:", counter["n"])  # 3 (everything cached)
    time.sleep(0.15)
    expensive(1)
    print("after expiry call:", counter["n"])  # 4 (1 expired, recomputed)
