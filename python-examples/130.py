# 130.py - Operator overloading via dunder methods
# Python lets you define how your objects interact with built-in operators
# by implementing the right dunder (double-underscore) method. This is the
# same machinery the standard library uses for ints, lists, datetime, etc.

from functools import total_ordering


@total_ordering
class Version:
    """A minimal version number supporting ==, <, <=, >, >=, and hashing."""

    __slots__ = ("major", "minor", "patch")

    def __init__(self, major: int, minor: int = 0, patch: int = 0):
        self.major, self.minor, self.patch = major, minor, patch

    # repr/str for readability
    def __repr__(self):
        return f"Version({self.major}.{self.minor}.{self.patch})"

    __str__ = __repr__

    # equality + hashing so Version can live in sets and dict keys
    def __eq__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        return (self.major, self.minor, self.patch) == (other.major, other.minor, other.patch)

    def __hash__(self):
        return hash((self.major, self.minor, self.patch))

    # one comparison is enough; @total_ordering fills in the rest
    def __lt__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        return (self.major, self.minor, self.patch) < (other.major, other.minor, other.patch)


class Money:
    """A simple value object that supports +, -, *, and ==."""

    __slots__ = ("amount", "currency")

    def __init__(self, amount: int, currency: str = "USD"):
        self.amount = amount
        self.currency = currency

    def __add__(self, other):
        if not isinstance(other, Money) or other.currency != self.currency:
            raise ValueError("currency mismatch")
        return Money(self.amount + other.amount, self.currency)

    def __sub__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return Money(self.amount - other.amount, self.currency)

    def __mul__(self, factor):
        if isinstance(factor, (int, float)):
            return Money(int(self.amount * factor), self.currency)
        return NotImplemented

    __rmul__ = __mul__  # allow 2 * money as well as money * 2

    def __eq__(self, other):
        return isinstance(other, Money) and (self.amount, self.currency) == (other.amount, other.currency)

    def __repr__(self):
        return f"Money({self.amount} {self.currency})"


if __name__ == "__main__":
    v1, v2 = Version(1, 2, 3), Version(1, 2, 4)
    print(v1 < v2, v1 == v1, sorted([Version(2, 0, 0), Version(1, 9, 9), Version(1, 10, 0)]))
    print({v1, v2})  # set uses __hash__ + __eq__

    wallet = Money(100) + Money(50) - Money(25) * 2
    print(wallet)
    print(2 * Money(10))
