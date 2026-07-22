# 89.py - cProfile: profile a function
import cProfile

def work():
    total = 0
    for i in range(10000):
        total += i * i
    return total

if __name__ == '__main__':
    cProfile.run('work()')
