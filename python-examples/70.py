# 70.py - hashlib: cryptographic hashes
import hashlib

data = b'hello'
print('MD5:', hashlib.md5(data).hexdigest())
print('SHA256:', hashlib.sha256(data).hexdigest())
