# 73.py - bytes and bytearray, struct for binary packing
from struct import pack, unpack

b = b'abc'
ba = bytearray(b)
ba[0] = 120
print('bytes:', b)
print('bytearray:', ba)

packed = pack('I', 1024)  # unsigned int
print('packed:', packed)
print('unpacked:', unpack('I', packed)[0])
