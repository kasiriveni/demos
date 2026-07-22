# 96.py - importlib: import a module dynamically
import importlib

math_mod = importlib.import_module('math')
print('sqrt(16)=', math_mod.sqrt(16))
