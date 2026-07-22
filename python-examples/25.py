# 25.py - Scope: Local vs Global
# Variables have different scopes depending on where they are defined.

x = "global"

def outer():
    x = "enclosed"
    def inner():
        x = "local"
        print(x)
    inner()
    print(x)

outer()
print(x)
