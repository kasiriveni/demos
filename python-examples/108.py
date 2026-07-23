# 108.py - Multiprocessing example (map using Pool)
from multiprocessing import Pool


def square(x):
    return x * x


if __name__ == "__main__":
    with Pool() as p:
        res = p.map(square, range(10))
    print('Squares:', res)
