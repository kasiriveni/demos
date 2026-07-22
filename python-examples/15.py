# 15.py - Lists
# Ordered, mutable, allow duplicates.

fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]

print(fruits[0])       # apple
fruits[1] = "blueberry"
print(fruits)          # ['apple', 'blueberry', 'cherry']

fruits.append("date")
print(fruits)



print(fruits.pop())      # Remove and return last item
print(fruits)            # Check the current state of the list
fruits.reverse()          # Reverse the list in place
print(fruits)            # Check the current state of the list
