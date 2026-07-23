# 116.py - hashlib (sha256) and simple HMAC-like comparison
import hashlib


def sha256_hex(s: str) -> str:
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


if __name__ == '__main__':
    text = 'important data'
    print('SHA256:', sha256_hex(text))
