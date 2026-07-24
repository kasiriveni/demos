# 153.py - dis and bytecode: peeking at what the interpreter actually runs
# `dis` disassembles Python functions into bytecode. The bytecode is what
# CPython's evaluation loop actually executes; it's the lowest level at
# which you can still reason about Python semantics portably.

import dis
import io


def add(a, b):
    total = a + b
    return total


def loop_sum(n):
    s = 0
    for i in range(n):
        s += i
    return s


def comprehension_example():
    return [x * x for x in range(5) if x % 2]


if __name__ == "__main__":
    print("== add ==")
    dis.dis(add)

    print("\n== loop_sum ==")
    dis.dis(loop_sum)

    print("\n== comprehension (note: a separate MAKE_FUNCTION/RETURN pair) ==")
    dis.dis(comprehension_example)

    # Get the raw bytecode as a stream for tooling:
    buf = io.StringIO()
    dis.dis(loop_sum, file=buf)
    snippet = buf.getvalue().splitlines()[:8]
    print("\nfirst 8 lines of disassembly for loop_sum:")
    for line in snippet:
        print("  " + line)
