# 52.py - Collections: namedtuple, defaultdict, Counter, deque
from collections import namedtuple, defaultdict, Counter, deque

# namedtuple: lightweight immutable objects
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)

# defaultdict: default factory for missing keys
dd = defaultdict(list)
dd["a"].append(1)
dd["b"].append(2)
print(dict(dd))

# Counter: count hashable items
words = ["apple", "banana", "apple", "cherry", "banana"]
cnt = Counter(words)
print(cnt.most_common(2))

# deque: double-ended queue
d = deque([1, 2, 3])
d.appendleft(0)
d.append(4)
print(d)
