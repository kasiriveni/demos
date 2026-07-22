# 65.py - queue: thread-safe producer/consumer
import queue
import threading

q = queue.Queue()

def producer():
    for i in range(3):
        q.put(i)

def consumer():
    while True:
        try:
            item = q.get(timeout=1)
        except queue.Empty:
            break
        print('Consumed', item)
        q.task_done()

threading.Thread(target=producer).start()
threading.Thread(target=consumer).start()
