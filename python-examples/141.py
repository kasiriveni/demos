# 141.py - Itertools recipes: chain, groupby, islice, tee, takewhile
# `itertools` provides fast, lazy building blocks for working with iterators.
# `groupby` is a common gotcha: it groups CONSECUTIVE equal items, so the
# input must already be sorted by the key.

import itertools
from operator import itemgetter


def demo_chain():
    # chain glues iterables end-to-end without materialising a list
    it = itertools.chain("abc", [1, 2], (True, False))
    print(list(it))                                # ['a','b','c',1,2,True,False]
    print(list(itertools.chain.from_iterable([[1, 2], [3], [4, 5]])))


def demo_groupby():
    rows = [
        ("fruit", "apple"),
        ("fruit", "banana"),
        ("veg",   "carrot"),
        ("veg",   "kale"),
        ("fruit", "mango"),
    ]
    # Note: groups are formed by CONSECUTIVE equal keys.
    for k, grp in itertools.groupby(rows, key=itemgetter(0)):
        print(k, "->", [r[1] for r in grp])

    # Sorted input gives a true groupby:
    rows.sort(key=itemgetter(0))
    print("after sort:")
    for k, grp in itertools.groupby(rows, key=itemgetter(0)):
        print(k, "->", [r[1] for r in grp])


def demo_islice_tee():
    src = itertools.count(1)                       # 1, 2, 3, ...
    head = list(itertools.islice(src, 5))          # first 5
    print("head:", head)                           # [1,2,3,4,5]

    a, b = itertools.tee(itertools.count(10), 2)  # two independent iterators
    print("a:", list(itertools.islice(a, 3)),
          "b:", list(itertools.islice(b, 3)))


def demo_filtering():
    # takewhile/dropwhile: act while/until predicate is true on a sequence
    nums = [1, 3, 5, 8, 9, 11, 14]
    print("takewhile <8:", list(itertools.takewhile(lambda n: n < 8, nums)))
    print("dropwhile <8:", list(itertools.dropwhile(lambda n: n < 8, nums)))

    # compress: select items by boolean mask
    print("compress:  ", list(itertools.compress("ABCDEF", [1, 0, 1, 0, 1, 1])))


if __name__ == "__main__":
    demo_chain()
    demo_groupby()
    demo_islice_tee()
    demo_filtering()
