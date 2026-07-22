# 97.py - pkgutil: discover modules in a package
import pkgutil
import importlib

for finder, name, ispkg in pkgutil.iter_modules():
    print('Module:', name, 'Package?', ispkg)
    break
