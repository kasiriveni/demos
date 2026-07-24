# 129.py - Copy semantics: shallow vs deep
# Assignment never copies in Python; it binds a name to the same object.
# copy.copy makes a shallow copy (the new container holds the SAME
# references to inner objects), while copy.deepcopy recursively copies
# everything. For immutable objects copy.deepcopy typically short-circuits.

import copy


a = [[1, 2], [3, 4], "hello"]
b = copy.copy(a)            # shallow
c = copy.deepcopy(a)        # deep

b[0].append(99)             # mutates inner list; affects a because shallow shares it
print("a:", a)
print("b (shallow):", b)
print("c (deep)   :", c)

# Demonstration with custom __copy__ / __deepcopy__ hooks
class Bag:
    def __init__(self, items):
        self.items = list(items)

    def __copy__(self):
        # Custom shallow copy
        return type(self)(self.items[:])

    def __deepcopy__(self, memo):
        # memo is required to break cycles and share sub-objects
        new_items = copy.deepcopy(self.items, memo)
        new = type(self)(new_items)
        memo[id(self)] = new
        return new

    def __repr__(self):
        return f"Bag({self.items!r})"


bag = Bag([["x"], ["y"]])
bag_copy = copy.copy(bag)
bag_deep = copy.deepcopy(bag)
print("bag      :", bag)
print("bag_copy :", bag_copy)
print("bag_deep :", bag_deep)
print("inner shared by shallow?", bag.items is bag_copy.items)
print("inner shared by deep   ?", bag.items is bag_deep.items)
