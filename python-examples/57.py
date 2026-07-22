# 57.py - Pathlib: modern filesystem paths
from pathlib import Path

p = Path('.')
print("CWD:", p.resolve())

# Iterate Python files in current dir
py_files = list(p.glob('*.py'))
print("Python files:", py_files)

# Create and remove a temp file safely
tmp = Path('tmp_example.txt')
tmp.write_text('hello')
print(tmp.read_text())
tmp.unlink()
