# 68.py - enum: enumerations for readable constants
from enum import Enum, auto

class Color(Enum):
    RED = auto()
    GREEN = auto()
    BLUE = auto()

print(Color.RED, Color.RED.name, Color.RED.value)
