# 60.py - Threading: simple worker threads
import threading
import time

def worker(name, delay=1):
    for i in range(3):
        print(f"{name} working {i}")
        time.sleep(delay)

threads = [threading.Thread(target=worker, args=(f"T{i}", 0.2)) for i in range(2)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print("All threads complete")
