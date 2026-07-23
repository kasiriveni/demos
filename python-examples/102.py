# 102.py - Generators and itertools (Fibonacci)
import itertools


def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


if __name__ == "__main__":
    f = fib()
    print('First 10 Fibonacci numbers:')
    print(list(itertools.islice(f, 10)))
