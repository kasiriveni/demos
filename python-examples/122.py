# 122.py - Singledispatch functions (function overloading on type)
# `functools.singledispatch` lets you register different implementations of a
# function for different argument types. The first parameter's type decides
# which registered version runs. Useful for polymorphic code without OOP.

from functools import singledispatch
from numbers import Number


@singledispatch
def serialize(obj):
    # Fallback for unknown types
    raise NotImplementedError(f"Cannot serialize {type(obj).__name__}")


@serialize.register
def _(obj: str) -> str:
    return f"str({obj!r})"


@serialize.register
def _(obj: int) -> str:
    return f"int({obj})"


@serialize.register
def _(obj: float) -> str:
    return f"float({obj:.6f})"


@serialize.register
def _(obj: list) -> str:
    return "[" + ", ".join(serialize(x) for x in obj) + "]"


@serialize.register
def _(obj: dict) -> str:
    parts = [f"{serialize(k)}: {serialize(v)}" for k, v in obj.items()]
    return "{" + ", ".join(parts) + "}"


# Abstract types work too. Any class inheriting from Number (int, float, Fraction, ...)
# will fall through to the Number version when no more specific registration exists.
@serialize.register
def _(obj: Number) -> str:
    return f"number({obj})"


if __name__ == "__main__":
    print(serialize("hi"))
    print(serialize(42))
    print(serialize(3.14))
    print(serialize([1, "x", 2.0]))
    print(serialize({"a": 1, "b": [2, 3]}))

    # Without a Number registration this would raise NotImplementedError.
    # With it, Fraction is matched through the abstract Number base.
    from fractions import Fraction
    print(serialize(Fraction(1, 3)))
