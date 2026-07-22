# 17.py - Tuples
# Ordered, immutable sequences. Often used for fixed collections.

point = (3, 5)
rgb = (255, 128, 0)

x, y = point
print(f"x={x}, y={y}")

# Tuples are immutable
# point[0] = 10  # TypeError

# Single-element tuple needs a trailing comma
single = (42,)
print(type(single))
