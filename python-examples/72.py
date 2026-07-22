# 72.py - base64: encode/decode binary data
import base64

data = b'hello world'
enc = base64.b64encode(data)
print('Encoded:', enc)
print('Decoded:', base64.b64decode(enc))
