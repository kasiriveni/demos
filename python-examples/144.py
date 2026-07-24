# 144.py - typing: TypeVar, Generic, ParamSpec, TypeGuard, NewType
# Beyond basic annotations, `typing` gives you the tools to express
# relationships between types: a function that returns the same type it
# was given, a function that works on any list of T, a callable that
# returns True only if its argument is some narrowed type, etc.

from typing import TypeVar, Generic, ParamSpec, Callable, TypeGuard, NewType, Any

T = TypeVar("T")              # "some type"
U = TypeVar("U")              # another type, possibly different
P = ParamSpec("P")            # a tuple of call parameters


def first(items: list[T]) -> T:
    return items[0]


def map_items(items: list[T], fn: Callable[[T], U]) -> list[U]:
    return [fn(x) for x in items]


class Stack(Generic[T]):
    def __init__(self) -> None:
        self._data: list[T] = []

    def push(self, x: T) -> None:
        self._data.append(x)

    def pop(self) -> T:
        return self._data.pop()


# ParamSpec preserves the signature of a wrapped function so type-checkers
# can reason about args/kwargs.
def logged(fn: Callable[P, T]) -> Callable[P, T]:
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        print("calling", fn.__name__, args, kwargs)
        return fn(*args, **kwargs)
    return wrapper


@logged
def add(a: int, b: int) -> int:
    return a + b


# TypeGuard: lets a function narrow the type for the type-checker
def is_str_list(obj: Any) -> TypeGuard[list[str]]:
    return isinstance(obj, list) and all(isinstance(x, str) for x in obj)


# NewType: a distinct type at type-check time, same as the underlying one at runtime
UserId = NewType("UserId", int)


def get_user(uid: UserId) -> str:
    return f"user#{uid}"


if __name__ == "__main__":
    print(first([10, 20, 30]))
    print(map_items([1, 2, 3], lambda x: x * x))
    s: Stack[int] = Stack()
    s.push(1); s.push(2)
    print(s.pop())

    print(add(2, 3))  # logged

    items: Any = ["a", "b"]
    if is_str_list(items):
        reveal_a = items  # type-checker now knows items is list[str]
        print("all strings:", reveal_a)

    print(get_user(UserId(7)))
