# 48.py - Unpacking
# Unpack iterables into variables. Use * to collect the rest.

a, b, c = (1, 2, 3)
print(a, b, c)

# Extended unpacking
first, *middle, last = [1, 2, 3, 4, 5]
print("First:", first)
print("Middle:", middle)
print("Last:", last)

# Unpack in a for loop
pairs = [("a", 1), ("b", 2), ("c", 3)]
for letter, num in pairs:
    print(letter, num)
