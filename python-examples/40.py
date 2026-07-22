# 40.py - Class Methods and Static Methods
# Three kinds of methods: instance, classmethod, staticmethod.

class Circle:
    pi = 3.14159

    def __init__(self, radius):
        self.radius = radius

    # Instance method - has access to self
    def area(self):
        return Circle.pi * self.radius ** 2

    # Class method - has access to cls (the class itself)
    @classmethod
    def from_diameter(cls, diameter):
        return cls(diameter / 2)

    # Static method - no access to self or cls
    @staticmethod
    def is_valid_radius(r):
        return r > 0

c = Circle.from_diameter(10)
print(c.area())
print(Circle.is_valid_radius(-1))  # False
