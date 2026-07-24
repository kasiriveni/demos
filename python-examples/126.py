# 126.py - __slots__ for memory-efficient classes
# Normally instances keep attributes in a per-instance __dict__. __slots__
# replaces that with a fixed, compact array per class, removing __dict__ from
# the instance. Faster attribute access, less memory, but you lose the ability
# to add attributes not declared in __slots__ (or in a parent class's slots).

import sys


class PointSlots:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x = x
        self.y = y


class PointDict:
    def __init__(self, x, y):
        self.x = x
        self.y = y


if __name__ == "__main__":
    s = PointSlots(1, 2)
    d = PointDict(1, 2)
    print("size slots:", sys.getsizeof(s), "bytes")
    print("size dict :", sys.getsizeof(d), "bytes (plus its __dict__)")
    print("has __dict__ slots:", hasattr(s, "__dict__"))
    print("has __dict__ dict :", hasattr(d, "__dict__"))

    try:
        s.z = 3
    except AttributeError as e:
        print("slots blocks new attribute:", e)

    d.z = 3
    print("dict class allows z =", d.z)
