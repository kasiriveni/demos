# 118.py - collections: Counter and deque
from collections import Counter, deque


def demo():
    words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
    print('Most common:', Counter(words).most_common(2))
    d = deque(maxlen=3)
    for i in range(5):
        d.append(i)
        print('Deque now:', list(d))


if __name__ == '__main__':
    demo()
