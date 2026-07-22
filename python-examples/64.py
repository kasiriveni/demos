# 64.py - Multiprocessing: spawn processes and share data via Queue
from multiprocessing import Process, Queue

def f(q, n):
    q.put(n * n)

if __name__ == '__main__':
    q = Queue()
    p = Process(target=f, args=(q, 5))
    p.start()
    print('Result from child:', q.get())
    p.join()
