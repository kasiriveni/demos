# 151.py - tracemalloc: find the source of memory leaks
# `tracemalloc` records every Python memory allocation. After taking a
# snapshot you can compare snapshots and see which call sites allocated
# the most bytes that survived between them - which is exactly what you
# need to track down a leak.

import tracemalloc
import linecache


def allocate(n: int) -> list[str]:
    # Each call leaks (in the sense of: holds onto) its own big list.
    return [f"row-{i:>08d}" for i in range(n)]


def main() -> None:
    tracemalloc.start()

    snap1 = tracemalloc.take_snapshot()

    big = [allocate(10_000) for _ in range(10)]  # keep refs

    snap2 = tracemalloc.take_snapshot()

    top_stats = snap2.compare_to(snap1, "lineno")
    print("Top 5 memory growth by location:")
    for stat in top_stats[:5]:
        frame = stat.traceback[0]
        line = linecache.getline(frame.filename, frame.lineno).strip()
        print(f"  +{stat.size_diff / 1024:6.1f} KiB  {frame.filename}:{frame.lineno}  {line}")

    # A summary grouped by file
    by_file = snap2.compare_to(snap1, "filename")
    print("\nBy file:")
    for stat in by_file[:5]:
        print(f"  {stat.size_diff / 1024:6.1f} KiB  {stat.traceback[0].filename}")


if __name__ == "__main__":
    main()
