#!/usr/bin/env python3
"""
hello.py - A simple Hello World example in Python.

Covers the most common ways to print a greeting:
  1. Basic print
  2. Formatted (f-string) greeting
  3. Greeting from a function
  4. Greeting from a command-line argument
"""

import sys


def greet(name: str = "World") -> str:
    """Return a friendly greeting for the given name."""
    return f"Hello, {name}!"


def main() -> None:
    # 1. Simplest form
    print("Hello, World!")

    # 2. Formatted string
    message = f"Hello, {greet('Python').split(', ')[1]}"
    print(message)

    # 3. Using the helper function
    print(greet("Developer"))

    # 4. From command-line argument, if provided
    if len(sys.argv) > 1:
        print(greet(sys.argv[1]))


if __name__ == "__main__":
    main()
