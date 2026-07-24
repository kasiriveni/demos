# 133.py - Asyncio primitives: gather, wait_for, TaskGroup, queues
# `asyncio` provides the same toolbox as threading does, but for coroutines.
# Tasks are scheduled on the event loop, queues are coroutine-safe, and
# `asyncio.TaskGroup` (3.11+) gives structured concurrency: a failure in
# any task cancels its siblings, then re-raises the first error.

import asyncio


async def fetch(n: int, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"item-{n}"


async def run_gather() -> list[str]:
    # Schedule many coroutines and wait for all of them
    return await asyncio.gather(*(fetch(i, 0.01 * i) for i in range(5)))


async def run_wait_for() -> None:
    # Time out a coroutine
    try:
        await asyncio.wait_for(fetch(99, delay=5), timeout=0.05)
    except asyncio.TimeoutError:
        print("wait_for: timed out (expected)")


async def run_task_group() -> list[str]:
    # 3.11+: structured concurrency; if any task raises, all siblings cancel.
    results: list[str] = []
    async with asyncio.TaskGroup() as tg:
        for i in range(3):
            results.append(tg.create_task(fetch(i, 0.01)))
    return [r.result() for r in results]


async def producer(q: asyncio.Queue, n: int) -> None:
    for i in range(n):
        await q.put(i)
        await asyncio.sleep(0.001)
    await q.put(None)  # poison pill


async def consumer(q: asyncio.Queue) -> None:
    while True:
        item = await q.get()
        if item is None:
            return
        print("got", item)


async def run_queue() -> None:
    q: asyncio.Queue = asyncio.Queue()
    await asyncio.gather(producer(q, 4), consumer(q))


async def main() -> None:
    print("gather:", await run_gather())
    await run_wait_for()
    print("TaskGroup:", await run_task_group())
    await run_queue()


if __name__ == "__main__":
    asyncio.run(main())
