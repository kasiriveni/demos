# 131.py - Enumerations with auto and rich values (enum module)
# `enum.Enum` makes a fixed set of named values. Members compare by identity
# (a is a). `IntEnum` mixes in `int` so members can be used as numbers.
# `auto()` assigns values automatically. Use `Flag` for bit-style
# combinations and `unique` to forbid duplicate values.

from enum import Enum, IntEnum, auto, Flag, unique


@unique                          # raises ValueError if two members alias the same value
class Color(Enum):
    RED = auto()                 # 1
    GREEN = auto()               # 2
    BLUE = auto()                # 3


class Priority(IntEnum):
    LOW = 1
    NORMAL = 5
    HIGH = 10


class Perm(Flag):
    READ = auto()                # 1
    WRITE = auto()               # 2
    EXEC = auto()                # 4


if __name__ == "__main__":
    print(Color.RED, Color.RED.value, Color.RED.name)
    print(list(Color))                          # iteration order = definition order
    print(Color(2))                             # lookup by value

    # IntEnum is comparable to ints and sortable
    print(Priority.HIGH > Priority.LOW, Priority.HIGH + 1)

    # Flag bitwise ops
    rw = Perm.READ | Perm.WRITE
    print(rw, "has EXEC?", Perm.EXEC in rw)
    print("READ+WRITE value =", int(rw))

    # Aliases: Color.RED is Color.RED (identity)
    print(Color.RED is Color.RED)
    # Members are hashable and usable as dict keys
    weights = {Color.RED: 1, Color.GREEN: 2, Color.BLUE: 3}
    print(weights[Color.GREEN])
