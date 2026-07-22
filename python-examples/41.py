# 41.py - Properties (Getters and Setters)
# Use @property to control attribute access.

class Person:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if not value:
            raise ValueError("Name cannot be empty.")
        self._name = value

p = Person("Alice")
print(p.name)
p.name = "Bob"
print(p.name)
