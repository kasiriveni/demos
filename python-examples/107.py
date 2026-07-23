# 107.py - Threading example with simple workers
import threading
import queue
import time


def worker(q, id_):
    while True:
        try:
            item = q.get(timeout=0.5)
        except Exception:
            return
        print(f'Worker {id_} processing', item)
        time.sleep(0.1)
        q.task_done()


if __name__ == "__main__":
    q = queue.Queue()
    for i in range(10):
        q.put(i)

    threads = [threading.Thread(target=worker, args=(q, i)) for i in range(3)]
    for t in threads:
        t.start()

    q.join()
    print('All tasks processed')
