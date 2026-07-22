# 55.py - Dataclasses for simple data containers (Python 3.7+)
from dataclasses import dataclass, field
from typing import List

@dataclass
class Person:
    name: str
    age: int = 0
    tags: List[str] = field(default_factory=list)

p = Person("Alice", tags=["python", "dev"])
print(p)
print(p.name, p.age, p.tags)
