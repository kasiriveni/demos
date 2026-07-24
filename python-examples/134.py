# 134.py - Memory-mapped files (mmap module)
# `mmap` exposes a file's contents as a bytes-like object backed by the OS
# page cache. Reads and slices become near-zero-copy because the kernel
# fetches pages on demand. You can also write through the mmap, and
# changes are visible to anyone else who has the same file open.

import mmap
import os
import tempfile

tmp = tempfile.NamedTemporaryFile(delete=False)
tmp.write(b"hello python mmap example\n" * 4)
tmp.flush()
path = tmp.name
tmp.close()

size = os.path.getsize(path)

with open(path, "r+b") as f:
    with mmap.mmap(f.fileno(), size, access=mmap.ACCESS_WRITE) as mm:
        # Read like a bytes object
        print("first 5 bytes:", mm[:5])

        # Find a substring and overwrite the region in place
        i = mm.find(b"python")
        print("found 'python' at", i)
        if i != -1:
            mm[i:i + 6] = b"PYTHON"

        # Tell where each line starts
        with memoryview(mm) as mv:    # zero-copy window
            for line in mv.tobytes().splitlines():
                print("line:", line)

# Clean up
os.unlink(path)
