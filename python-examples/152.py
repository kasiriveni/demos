# 152.py - gc and reference cycles: when cycles happen and how to break them
# Python uses reference counting plus a cycle-collector. Cycles (A->B and
# B->A, with no outside reference) can't be reclaimed by refcounting
# alone; gc finds and breaks them. You can inspect what gc is tracking,
# and you can ask it to collect on demand.

import gc
import weakref


class Node:
    def __init__(self, name: str):
        self.name = name
        self.peer = None

    def __repr__(self):
        return f"Node({self.name!r})"


if __name__ == "__main__":
    # Disable automatic collection so we can demonstrate it explicitly.
    gc.disable()

    a = Node("a")
    b = Node("b")
    a.peer = b
    b.peer = a                # a<->b is a cycle; no outside refs
    print("a still alive (refcount holds it):", a is not None)

    # Confirm gc sees them as garbage
    print("garbage before collect:", gc.garbage)
    print("is_tracked a:", gc.is_tracked(a))

    # Drop our references; refcount can't help.
    del a, b

    # Force a collection. Returns the count of unreachable objects found.
    n = gc.collect()
    print("collected:", n, "garbage after:", gc.garbage[:2])

    # Re-enable automatic collection.
    gc.enable()

    # finalizers: __del__ is the historical way; weakref.finalize is safer
    seen: list[str] = []

    def make(name: str):
        def finalize(_=None):
            seen.append(name)
        return weakref.finalize(name, finalize)  # noqa: F841

    make("x")
    gc.collect()
    print("seen:", seen)
