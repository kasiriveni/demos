# 155.py - typing overload: precise function signatures
# `@typing.overload` lets you declare multiple signatures for one function.
# Tools (mypy, pyright) use the signatures to infer a more accurate return
# type than a single signature could express. At runtime the last definition
# wins; the overloads are just for the type-checker.

from typing import overload, Literal


@overload
def parse(value: str) -> int: ...                # digits -> int
@overload
def parse(value: bytes) -> int: ...              # b"123" -> int
@overload
def parse(value: str, as_hex: Literal[True]) -> int: ...
@overload
def parse(value: str, as_hex: Literal[False]) -> int: ...
def parse(value, as_hex=False):                  # the real implementation
    if isinstance(value, bytes):
        value = value.decode()
    return int(value, 16 if as_hex else 10)


# A more user-friendly variant: str -> str if it's a string field, else int
@overload
def normalize(x: int) -> int: ...
@overload
def normalize(x: float) -> float: ...
@overload
def normalize(x: str) -> str: ...
def normalize(x):
    if isinstance(x, (int, float)):
        return x * 2
    return x.strip().lower()


if __name__ == "__main__":
    print(parse("42"))             # int
    print(parse(b"42"))            # int
    print(parse("ff", as_hex=True))  # 255

    print(normalize(5))            # 10
    print(normalize(2.5))          # 5.0
    print(normalize("  Hi  "))     # "hi"
