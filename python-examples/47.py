# 47.py - Context Managers
# Use 'with' to manage resources. Implement with __enter__ and __exit__.

class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.end = time.time()
        print(f"Elapsed: {self.end - self.start:.4f}s")
        return False

with Timer():
    total = sum(range(1_000_000))
    print("Sum:", total)
