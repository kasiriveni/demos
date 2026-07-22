# 100.py - inspect: introspect live objects and source
import inspect
import math

print('Functions in math module sample:')
print([name for name, obj in inspect.getmembers(math, inspect.isbuiltin)][:5])
print('Source of inspect.getmembers():')
print(inspect.getsource(inspect.getmembers)[:200])
