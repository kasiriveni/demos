# 158.py - reprlib, pprint, and warnings for friendly output
# This file pulls together a few "small but mighty" standard-library tools
# that help you avoid drowning in noise:
#   * `reprlib` produces safe, truncated repr()s for very large objects
#   * `warnings` lets you emit user-visible warnings (and the user can
#     filter or turn them into errors with -W).

import reprlib
import warnings


# --- reprlib: a repr() that doesn't blow up on huge structures ---
big = list(range(10_000))
short = reprlib.repr(big)              # by default truncates deeply
print("reprlib length:", len(short))
print("first 80 chars:", short[:80] + " ...")


class Tree:
    def __init__(self, value, children=()):
        self.value = value
        self.children = list(children)

    def __repr__(self):
        # Without reprlib, deeply-nested trees would dump forever.
        return f"<Tree value={self.value!r} children={reprlib.repr(self.children)}>"


# --- warnings: signal "this is suspicious, but not wrong" ---
class Legacy:
    @warnings.deprecated("use NewClass instead")    # 3.13+
    def do_old(self):
        return "doing it the old way"

    def do_new(self):
        return "doing it the new way"


# Filter & control warnings from code (the user can also use -W)
warnings.simplefilter("default")                     # show all warnings once per location
print(Legacy().do_new())

# Programmatically, catch warnings as exceptions
with warnings.catch_warnings():
    warnings.simplefilter("error", DeprecationWarning)   # turn one category into an error
    try:
        Legacy().do_old()                                  # would warn -> now raises
    except DeprecationWarning as e:
        print("caught:", e)
