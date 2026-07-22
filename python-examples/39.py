# 39.py - Encapsulation (Private Attributes)
# Use underscores to indicate private attributes by convention.

class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # name-mangled "private" attribute

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

account = BankAccount(100)
account.deposit(50)
print(account.get_balance())

# Direct access is blocked
# print(account.__balance)  # AttributeError
# But you can still reach it: account._BankAccount__balance (don't do this)
