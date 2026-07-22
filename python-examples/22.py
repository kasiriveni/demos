# 22.py - Default and Keyword Arguments
# Functions can have default values and accept named arguments.

def greet(name, message="Hello", punctuation="!"):
    return f"{message}, {name}{punctuation}"

print(greet("Alice"))
print(greet("Bob", message="Hi"))
print(greet("Charlie", punctuation="?"))
print(greet(name="Dave", message="Hey"))  # keyword args
