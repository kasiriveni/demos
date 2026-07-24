# 127.py - Metaclasses: classes whose instances are classes
# A metaclass is the "class of a class". The default metaclass is `type`.
# By subclassing type and overriding __new__ / __init__ you can customize
# how every class that uses it is created (registering, validating,
# auto-adding methods, etc.). Class decorators can do similar things for
# a single class; metaclasses apply to every subclass automatically.

class RegistryMeta(type):
    """Metaclass that keeps track of every class created with it."""

    _registry: dict[str, type] = {}

    def __new__(mcs, name, bases, namespace):
        # Auto-mark the class as abstract if any method is decorated with @abstract
        if bases and any(
            v.__class__.__name__ == "function" and getattr(v, "_is_abstract", False)
            for v in namespace.values()
        ):
            namespace.setdefault("_abstract", True)
        cls = super().__new__(mcs, name, bases, namespace)
        mcs._registry[name] = cls
        return cls


def abstractmethod(func):
    func._is_abstract = True
    return func


class Animal(metaclass=RegistryMeta):
    @abstractmethod
    def speak(self) -> str: ...


class Dog(Animal):
    def speak(self) -> str:
        return "woof"


class Cat(Animal):
    def speak(self) -> str:
        return "meow"


if __name__ == "__main__":
    print("Registry:", list(RegistryMeta._registry))
    for cls in (Dog, Cat):
        print(cls.__name__, "->", cls().speak())

    # Class-level attribute was added by the metaclass
    print("Cat._abstract =", getattr(Cat, "_abstract", False))
