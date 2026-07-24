# 159.py - multiprocessing.shared_memory: zero-copy inter-process data
# `multiprocessing.shared_memory.SharedMemory` lets multiple processes
# attach to the same block of bytes. No sockets, no pickling, no copying
# - just a memory region visible to all of them. This is the lowest-
# level stdlib option for fast in-memory data exchange.

from multiprocessing import shared_memory, Process
import numpy as np


def worker(name: str, shape, dtype):
    # In a child process, attach to the same named block and write data.
    shm = shared_memory.SharedMemory(name=name, create=False)
    arr = np.ndarray(shape, dtype=dtype, buffer=shm.buf)
    arr[:] = np.arange(arr.size, dtype=dtype).reshape(shape) + 100
    print(f"worker wrote: {arr.tolist()}")
    shm.close()


def main():
    shape, dtype = (3, 3), np.int64
    nbytes = int(np.prod(shape) * np.dtype(dtype).itemsize)

    shm = shared_memory.SharedMemory(create=True, size=nbytes)
    arr = np.ndarray(shape, dtype=dtype, buffer=shm.buf)
    arr[:] = 0
    print("initial:", arr.tolist())

    p = Process(target=worker, args=(shm.name, shape, dtype))
    p.start()
    p.join()

    print("parent sees:", arr.tolist())
    shm.close()
    shm.unlink()                                  # release the OS resource


if __name__ == "__main__":
    main()
