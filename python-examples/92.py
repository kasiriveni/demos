# 92.py - os.path and shutil: file operations
import os
import shutil

print('cwd', os.getcwd())
src = __file__
dst = src + '.copy'
shutil.copy(src, dst)
print('Copied to', dst)
os.remove(dst)
