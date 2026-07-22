# 74.py - memoryview: zero-copy access to buffer
data = bytearray(b'hello')
mv = memoryview(data)
mv[0] = ord('H')
print(data)
