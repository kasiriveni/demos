# 124.py - Protocols and structural typing (typing.Protocol)
# `typing.Protocol` defines a structural interface: any class that has the
# right methods/attributes satisfies it, with no need to inherit from a
# base. This is "duck typing" checked statically. Use `@runtime_checkable`
# to also enable isinstance/issubclass checks at runtime.

from typing import Protocol, runtime_checkable, Iterable


# Structural protocol
class SupportsClose(Protocol):
    def close(self) -> None: ...


class SupportsRead(Protocol):
    def read(self, n: int = -1) -> str: ...


@runtime_checkable
class Closable(Protocol):
    def close(self) -> None: ...


# A user class that never inherits from anything special
class MyFile:
    def __init__(self, name: str):
        self.name = name

    def close(self) -> None:
        print(f"closing {self.name}")

    def read(self, n: int = -1) -> str:
        return f"<contents of {self.name} (n={n})>"


# A function that only cares about the protocol surface
def safe_close(resource: SupportsClose) -> None:
    resource.close()


def slurp(reader: SupportsRead, n: int = 4) -> None:
    print("read:", reader.read(n))


# Generic protocol
@runtime_checkable
class SizedIter(Protocol[T]):  # type: ignore[name-defined]
    def __len__(self) -> int: ...
    def __iter__(self) -> Iterable: ...


if __name__ == "__main__":
    f = MyFile("notes.txt")
    safe_close(f)
    slurp(f)

    # Runtime check works because we marked it runtime_checkable
    print("MyFile satisfies Closable? ", isinstance(f, Closable))
