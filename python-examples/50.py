# 50.py - Type Hints
# Annotate function parameters and return types for clarity (and tooling).

from typing import List, Dict, Optional, Tuple

def greet(name: str) -> str:
    return f"Hello, {name}"

def average(values: List[float]) -> float:
    return sum(values) / len(values)

def lookup(table: Dict[str, int], key: str) -> Optional[int]:
    return table.get(key)

def parse(s: str) -> Tuple[int, str]:
    parts = s.split(":")
    return int(parts[0]), parts[1]

print(greet("Alice"))
print(average([1.0, 2.0, 3.0]))
print(lookup({"a": 1, "b": 2}, "a"))
