# 18.py - Dictionaries
# Key-value pairs. Unordered (insertion-ordered in 3.7+), mutable.

person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

print(person["name"])
person["email"] = "alice@example.com"
print(person)

# Safe access
print(person.get("phone", "Not provided"))

print(person.keys())
print(person.values())
print(person.items())


print(person.get("age"))  # Accessing existing key
print(person)              # Check the current state of the dictionary
