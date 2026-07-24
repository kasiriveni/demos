# 142.py - functools.partial, reduce, total_ordering, cached_property
# This file collects small but powerful utilities from `functools` that you
# reach for constantly when writing libraries.

import functools


# --- partial: pre-fill some arguments of a function. ---
def power(base, exp):
    return base ** exp


square = functools.partial(power, exp=2)
cube = functools.partial(power, exp=3)
print("square(5) =", square(5))
print("cube(2)   =", cube(2))


# --- reduce: collapse an iterable with a binary function. ---
nums = [1, 2, 3, 4, 5]
total = functools.reduce(lambda a, b: a + b, nums, 0)   # 15
product = functools.reduce(lambda a, b: a * b, nums, 1) # 120
print("reduce sum =", total, "product =", product)


# --- total_ordering: fill in all ordering methods from __eq__ + ONE of <,<=,>,>=. ---
@functools.total_ordering
class Score:
    __slots__ = ("v",)
    def __init__(self, v): self.v = v
    def __eq__(self, other): return self.v == other.v
    def __lt__(self, other): return self.v < other.v
    def __repr__(self): return f"Score({self.v})"

print("scores sorted:", sorted([Score(3), Score(1), Score(2)]))
print("Score(3) >= Score(2)? ", Score(3) >= Score(2))   # filled in by total_ordering


# --- cached_property: compute once, then store on the instance. ---
class Config:
    @functools.cached_property
    def expensive(self):
        print("  computing expensive()")
        return sum(range(1_000_000))

c = Config()
print("first access :", c.expensive)        # computes
print("second access:", c.expensive)        # cached
print("has __dict__? ", hasattr(c, "__dict__"))  # cached_property uses __dict__
print("vars(c) keys :", list(vars(c).keys()))
