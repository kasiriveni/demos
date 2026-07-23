# 23.py - *args and **kwargs
# Accept a variable number of positional and keyword arguments.

def summarize(*args, **kwargs):
    print("Positional:", args)
    print("Keyword:", kwargs)

summarize(1, 2, 3, name="Alice", age=30)

def total(*nums):
    return sum(nums)

print(total(1, 2, 3, 4, 5))


print(total(1, 4,5,5,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20))
