# 123.py - Abstract Base Classes (abc module)
# ABCs define a contract: subclasses must implement marked methods. Python
# won't let you instantiate an ABC with abstract methods, and you can ask
# isinstance/issubclass questions in a structural way (e.g. "is this a
# Sequence?") without depending on a concrete base class.

from abc import ABC, abstractmethod
from collections.abc import Sequence
from math import pi


class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...
    @abstractmethod
    def perimeter(self) -> float: ...

    def describe(self) -> str:
        return f"{type(self).__name__}: area={self.area():.2f}, peri={self.perimeter():.2f}"


class Circle(Shape):
    def __init__(self, r: float):
        self.r = r

    def area(self) -> float:
        return pi * self.r ** 2

    def perimeter(self) -> float:
        return 2 * pi * self.r


class Rect(Shape, Sequence):  # multi-inheritance: Shape contract + Sequence protocol
    def __init__(self, w: float, h: float):
        self.w, self.h = w, h

    def area(self) -> float:
        return self.w * self.h

    def perimeter(self) -> float:
        return 2 * (self.w + self.h)

    # Sequence protocol: __getitem__ + __len__
    def __getitem__(self, i):
        if isinstance(i, slice):
            return [self.w, self.h][i]
        return (self.w, self.h)[i]

    def __len__(self):
        return 2


if __name__ == "__main__":
    try:
        Shape()        # type: ignore[abstract]
    except TypeError as e:
        print("Cannot instantiate abstract Shape:", e)

    c = Circle(2)
    r = Rect(3, 4)
    print(c.describe())
    print(r.describe())

    # Structural check using the ABC
    print("Circle is Shape?   ", isinstance(c, Shape))
    print("Rect is Sequence?  ", isinstance(r, Sequence))
    # Sequence protocol gives Rect iteration, len, indexing for free
    print("len(r)=", len(r), "r[0]=", r[0], "list(r)=", list(r))
