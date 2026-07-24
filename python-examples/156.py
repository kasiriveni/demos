# 156.py - typing final, Literal, TypedDict, dataclass + asdict
# Common typing helpers used in real code:
#   * Final: a name that should never be reassigned.
#   * Literal: a value constrained to a small set of strings/numbers.
#   * TypedDict: a dict whose keys and value types are known.
#   * asdict(): serialise a dataclass to a plain dict (recursively).

import typing
from typing import Final, Literal, TypedDict
from dataclasses import dataclass, asdict, field


MAX_RETRIES: Final = 3                  # tools warn if you reassign it


Mode = Literal["read", "write", "append"]


class Movie(TypedDict):
    title: str
    year: int
    rating: float


@dataclass
class Director:
    name: str
    birth_year: int
    movies: list[str] = field(default_factory=list)


@dataclass
class Catalog:
    title: str
    directors: list[Director] = field(default_factory=list)


def open_file(path: str, mode: Mode) -> str:
    # mode is statically checked to be one of three strings.
    return f"opening {path} in {mode!r} mode"


if __name__ == "__main__":
    print(open_file("a.txt", "read"))

    m: Movie = {"title": "Inception", "year": 2010, "rating": 8.8}
    # type-checker catches a wrong key or wrong type:
    bad: Movie = {"title": "x", "year": "2010", "rating": 1.0}    # type: ignore[typeddict-unknown-key]  # noqa

    cat = Catalog("Arthouse", [
        Director("Wes Anderson", 1969, ["The Grand Budapest Hotel"]),
    ])
    # asdict() recurses into nested dataclasses
    print(asdict(cat))

    # Final is enforced by type-checkers (not at runtime):
    print("MAX_RETRIES =", MAX_RETRIES)
