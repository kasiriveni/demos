# 132.py - Contextvars: per-task/per-async state
# `contextvars` is the modern way to keep state that is "local" to the
# current asyncio task or thread, similar to thread-locals but aware of
# coroutine context switches. The stdlib uses it for things like
# decimal.getcontext() replacement and database connection scoping.

import asyncio
import contextvars

# A module-level ContextVar holds the "current" value for the running task
request_id: contextvars.ContextVar[str] = contextvars.ContextVar("request_id", default="-")


async def handle(name: str):
    # Set a value just for this coroutine; once it returns, the var reverts.
    token = request_id.set(name)
    try:
        await asyncio.sleep(0.01)
        print(f"[{request_id.get()}] doing work as {name}")
        # nested call sees the same value
        await child(name + ".child")
    finally:
        request_id.reset(token)


async def child(label: str):
    print(f"[{request_id.get()}] child called from {label}")


async def main():
    await asyncio.gather(handle("A"), handle("B"), handle("C"))


if __name__ == "__main__":
    asyncio.run(main())
    print("after run, request_id =", request_id.get())
