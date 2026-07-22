# 38.py - Inheritance
# Subclasses inherit attributes and methods from parent classes.

class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound."

class Cat(Animal):
    def speak(self):  # override
        return f"{self.name} says meow."

class Dog(Animal):
    def speak(self):
        return f"{self.name} says woof."

animals = [Cat("Whiskers"), Dog("Rex")]
for a in animals:
    print(a.speak())
