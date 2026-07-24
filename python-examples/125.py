# 125.py - Descriptors: how properties, methods, and slots really work
# A descriptor is any object that defines __get__, __set__, or __delete__.
# When placed as a class attribute, Python calls those methods on attribute
# access. This is the mechanism behind @property, bound methods, classmethod,
# and slots.

class NonNegative:
    """A descriptor that clamps any numeric assignment to >= 0."""

    def __init__(self, name: str):
        self.name = name              # the attribute name on the owner

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self              # class-level access returns the descriptor itself
        return obj.__dict__.get(self.name, 0)

    def __set__(self, obj, value):
        if value < 0:
            raise ValueError(f"{self.name} cannot be negative, got {value}")
        obj.__dict__[self.name] = value


class BankAccount:
    balance = NonNegative("balance")

    def __init__(self, balance: float):
        self.balance = balance        # routed through descriptor __set__


class Validated:
    """A type-checked descriptor."""
    def __init__(self, name, expected_type):
        self.name = name
        self.expected_type = expected_type

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__[self.name]

    def __set__(self, obj, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(f"{self.name} expected {self.expected_type.__name__}, got {type(value).__name__}")
        obj.__dict__[self.name] = value


class User:
    name = Validated("name", str)
    age = Validated("age", int)

    def __init__(self, name, age):
        self.name = name
        self.age = age


if __name__ == "__main__":
    a = BankAccount(100)
    print("initial balance:", a.balance)
    a.balance = 250
    print("after deposit :", a.balance)
    try:
        a.balance = -1
    except ValueError as e:
        print("blocked:", e)

    u = User("Ada", 36)
    print(u.name, u.age)
    try:
        u.age = "thirty"  # type: ignore[arg-type]
    except TypeError as e:
        print("blocked:", e)
