# 105.py - typing and NamedTuple example
from typing import NamedTuple


class Point(NamedTuple):
    x: float
    y: float


def distance(p1: Point, p2: Point) -> float:
    return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** 0.5


if __name__ == "__main__":
    a = Point(0, 0)
    b = Point(3, 4)
    print('Distance:', distance(a, b))
