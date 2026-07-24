# 140.py - difflib and filecmp: comparing text and files
# `difflib` produces unified diffs and similarity ratios between strings
# or sequences. `filecmp` compares files and directories on disk.

import difflib
import filecmp
import os
import tempfile


def demo_difflib():
    a = ["alpha\n", "beta\n", "gamma\n", "delta\n"]
    b = ["alpha\n", "BETA\n", "gamma\n", "epsilon\n"]

    # SequenceMatcher returns a ratio in [0, 1]
    ratio = difflib.SequenceMatcher(a=a, b=b).ratio()
    print("similarity:", round(ratio, 3))

    # Unified diff (the format you'd write to a .patch file)
    diff = "".join(difflib.unified_diff(a, b, fromfile="old", tofile="new", lineterm=""))
    print(diff)

    # get_close_matches: spellcheck-style fuzzy search
    print(difflib.get_close_matches("grapy", ["grape", "graph", "crab", "happy"]))


def demo_filecmp():
    d = tempfile.mkdtemp()
    f1 = os.path.join(d, "a.txt")
    f2 = os.path.join(d, "b.txt")
    open(f1, "w").write("hello\n")
    open(f2, "w").write("hello\n")
    print("same files? ", filecmp.cmp(f1, f2, shallow=False))
    open(f2, "a").write("world\n")
    print("after edit? ", filecmp.cmp(f1, f2, shallow=False))


if __name__ == "__main__":
    demo_difflib()
    print("---")
    demo_filecmp()
