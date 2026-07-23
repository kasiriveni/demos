# 104.py - dataclasses example
from dataclasses import dataclass, field
from typing import List


@dataclass
class Task:
    id: int
    title: str
    done: bool = False
    tags: List[str] = field(default_factory=list)

    def toggle(self):
        self.done = not self.done


if __name__ == "__main__":
    t = Task(1, 'Write examples', tags=['python', 'examples'])
    print(t)
    t.toggle()
    print('Done?', t.done)
