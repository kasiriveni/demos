# 69.py - secrets: secure random numbers for tokens
import secrets

token = secrets.token_hex(16)
print('Secure token:', token)
print('Random choice:', secrets.choice(['a', 'b', 'c']))
