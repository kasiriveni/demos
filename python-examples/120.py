# 120.py - Decimal and Fractions demonstration
from decimal import Decimal, getcontext
from fractions import Fraction


def demo():
    getcontext().prec = 10
    a = Decimal('0.1') + Decimal('0.2')
    print('Decimal 0.1+0.2 =', a)
    f = Fraction(1, 3) + Fraction(1, 6)
    print('Fraction 1/3 + 1/6 =', f)


if __name__ == '__main__':
    demo()
