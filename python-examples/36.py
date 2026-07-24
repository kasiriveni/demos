# 36.py - Modules and Imports
# Organize code into modules. Import standard or custom modules.

import math
from random import randint, choice
# import os

from os import getcwd

print(math.sqrt(16))              # 4.0
print(math.pi)                    # 3.14159...
print(randint(1, 10))             # random int 1..10
print(choice(["a", "b", "c"]))    # random pick
print(getcwd())                # current working dir
