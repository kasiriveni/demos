# 112.py - CSV read/write example
import csv


ROWS = [
    ('id', 'name', 'score'),
    (1, 'Alice', 9.5),
    (2, 'Bob', 8.0),
]


def demo(path='sample.csv'):
    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(ROWS)

    with open(path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            print(row)


if __name__ == '__main__':
    demo()
