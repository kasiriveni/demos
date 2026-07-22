# 81.py - urllib.request: simple HTTP GET
from urllib.request import urlopen

try:
    with urlopen('http://example.com') as r:
        print('Status:', r.status)
        print(r.read(64))
except Exception as e:
    print('Request failed:', e)
