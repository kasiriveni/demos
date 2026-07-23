# 101.py - Custom context manager (class + contextlib)
from contextlib import contextmanager


class ManagedResource:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"Entering resource: {self.name}")
        return self

    def __exit__(self, exc_type, exc, tb):
        print(f"Exiting resource: {self.name}")
        # don't suppress exceptions
        return False


@contextmanager
def managed(name):
    print(f"Set up {name}")
    try:
        yield name
    finally:
        print(f"Tear down {name}")


if __name__ == "__main__":
    with ManagedResource('A') as r:
        print('Using', r.name)

    with managed('B') as name:
        print('Using', name)
