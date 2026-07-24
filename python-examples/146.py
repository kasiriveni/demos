# 146.py - importlib.resources: read files that ship with your package
# When you distribute a Python package, you often need to bundle data files
# (templates, JSON, certificates). `importlib.resources` (and the newer
# `files()` API from 3.9+) gives you a clean, package-relative way to
# load them - no need to fight `__file__`, no path issues inside zipapps.

import importlib.resources
import json
import os
import sys
import tempfile

# To use this without a real package, we synthesise one in a temp dir.
pkg_root = tempfile.mkdtemp()
pkg = os.path.join(pkg_root, "demo_pkg")
os.makedirs(pkg)
with open(os.path.join(pkg, "__init__.py"), "w") as f:
    f.write("version = '1.0'\n")
with open(os.path.join(pkg, "config.json"), "w") as f:
    json.dump({"name": "demo", "items": [1, 2, 3]}, f)

# Make the synthesised package importable
sys.path.insert(0, pkg_root)

import demo_pkg                          # type: ignore[import-not-found]
print("version:", demo_pkg.version)

# Read the bundled data file
traversable = importlib.resources.files("demo_pkg") / "config.json"
print("exists:", traversable.is_file())

text = traversable.read_text(encoding="utf-8")
print("text:", text)

# Or get raw bytes / file handle
data = importlib.resources.files("demo_pkg").joinpath("config.json").read_bytes()
print("parsed:", json.loads(data))
