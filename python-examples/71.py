# 71.py - hmac: message authentication codes
import hmac
import hashlib

key = b'secret'
msg = b'important'
hm = hmac.new(key, msg, hashlib.sha256)
print('HMAC:', hm.hexdigest())
