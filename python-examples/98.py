# 98.py - zipfile: read/write zip archives
import zipfile

with zipfile.ZipFile('example.zip', 'w') as z:
    z.writestr('hello.txt', 'Hello zip')

with zipfile.ZipFile('example.zip', 'r') as z:
    print(z.read('hello.txt'))
