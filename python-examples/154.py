# 154.py - contextlib: ExitStack, suppress, redirect_stdout, nullcontext
# `contextlib` is a toolbox of context managers, useful when:
#   * you want to ignore specific exceptions (`suppress`)
#   * you want to capture stdout (`redirect_stdout`)
#   * you need a "do nothing" context manager (`nullcontext`)
#   * you have an arbitrary number of resources to clean up (`ExitStack`).

import contextlib
import io
import os


@contextlib.contextmanager
def open_two(path1, path2):
    f1 = open(path1, "w")
    try:
        f2 = open(path2, "w")
        try:
            yield f1, f2
        finally:
            f2.close()
    finally:
        f1.close()


@contextlib.contextmanager
def timer(label: str = "block"):
    import time
    t0 = time.perf_counter()
    yield
    print(f"[timer] {label}: {time.perf_counter() - t0:.6f}s")


if __name__ == "__main__":
    # --- suppress: ignore a specific exception type entirely ---
    with contextlib.suppress(FileNotFoundError):
        os.remove("/no/such/file.txt")
    print("survived missing-file")

    # --- redirect_stdout: capture print() output ---
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        print("captured A")
        print("captured B")
    print("got:", repr(buf.getvalue()))

    # --- nullcontext: choose at runtime between "do something" and "do nothing" ---
    if True:
        cm = contextlib.nullcontext("default value")
    else:
        @contextlib.contextmanager
        def override(value):
            yield value
        cm = override("override!")
    with cm as v:
        print("inside:", v)

    # --- ExitStack: open any number of resources and close them all in reverse ---
    with contextlib.ExitStack() as stack:
        files = [stack.enter_context(open(f"_tmp_{i}.txt", "w")) for i in range(3)]
        for f in files:
            f.write("hi")
        # any extra cleanup hooks are added with .callback(callable)
        stack.callback(lambda: print("ExitStack: cleanup ran"))
    for i in range(3):
        os.unlink(f"_tmp_{i}.txt")

    # --- reusing our two-file context manager ---
    with timer("write two files"):
        with open_two("a.txt", "b.txt") as (a, b):
            a.write("alpha\n")
            b.write("beta\n")
    for n in ("a.txt", "b.txt"):
        with open(n) as f:
            print(n, "->", f.read().strip())
        os.unlink(n)
