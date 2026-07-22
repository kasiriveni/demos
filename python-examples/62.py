# 62.py - Asyncio: simple async/await example
import asyncio

async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)

async def main():
    await asyncio.gather(
        say_after(1, "hello"),
        say_after(0.5, "world")
    )

if __name__ == '__main__':
    asyncio.run(main())
