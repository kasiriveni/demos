# 160.py - pathlib recipes: glob, rglob, with_name, owner, read_text
# `pathlib.Path` is a full object-oriented filesystem API. It supports
# globbing, reading/writing text and bytes, joining paths, querying stat,
# and creating files / directories. This file is a "best of" tour.

from pathlib import Path
import datetime as _dt
import os
import tempfile


def demo_basic():
    p = Path("subdir/notes.txt")
    print("with_name:", p.with_name("new.txt"))
    print("with_suffix:", p.with_suffix(".md"))
    print("parent:", p.parent, "parts:", p.parts)


def demo_io():
    with tempfile.TemporaryDirectory() as d:
        root = Path(d)
        (root / "hello.txt").write_text("hi from pathlib\n", encoding="utf-8")
        (root / "binary.bin").write_bytes(b"\x00\x01\x02")
        print("hello read:", (root / "hello.txt").read_text().strip())
        print("binary   :", (root / "binary.bin").read_bytes().hex())


def demo_glob():
    with tempfile.TemporaryDirectory() as d:
        root = Path(d)
        for sub in ("a", "b", "c"):
            (root / sub).mkdir()
            for i in range(3):
                (root / sub / f"file_{i}.txt").write_text("x")

        # All .txt files at any depth:
        print("rglob *.txt:", sorted(p.relative_to(root) for p in root.rglob("*.txt")))
        # Top-level only:
        print("glob  *.txt:", sorted(p.relative_to(root) for p in root.glob("*.txt")))


def demo_stat():
    p = Path(__file__)
    s = p.stat()
    print("size:", s.st_size, "mtime:", _dt.datetime.fromtimestamp(s.st_mtime))
    print("suffix:", p.suffix, "stem:", p.stem, "name:", p.name)


if __name__ == "__main__":
    demo_basic()
    demo_io()
    demo_glob()
    demo_stat()
