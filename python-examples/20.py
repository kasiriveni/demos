# 20.py - Type Conversion
# Convert between types using built-in functions.

x = 10
y = "20"

# String to int
result = x + int(y)
print(result)  # 30

# Int to string
print("Number: " + str(x))

# List/tuple/set conversion
print(list("abc"))        # ['a', 'b', 'c']
print(tuple([1, 2, 3]))
print(set([1, 1, 2, 3]))  # {1, 2, 3}
