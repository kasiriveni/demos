# 37.py - Classes and Objects
# Object-oriented programming with classes.

class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"

    # Constructor
    def __init__(self, name, age):
        self.name = name      # instance attribute
        self.age = age

    # Method
    def bark(self):
        return f"{self.name} says woof!"

    def __str__(self):
        return f"{self.name}, {self.age} years old"

dog = Dog("Rex", 5)
print(dog)
print(dog.bark())
print(Dog.species)
