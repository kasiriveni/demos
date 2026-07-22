# 13.py - String Methods
# Common string operations return new strings.

text = "  Python is Fun  "

print(text.lower())        # "  python is fun  "
print(text.upper())        # "  PYTHON IS FUN  "
print(text.strip())        # "Python is Fun" (removes whitespace)
print(text.replace("Fun", "Awesome"))
print(text.split())        # ['Python', 'is', 'Fun']
print("iss" in text)        # True
