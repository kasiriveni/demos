# 59.py - Decimal and Fraction for precise arithmetic
from decimal import Decimal, getcontext
from fractions import Fraction

getcontext().prec = 28
print('Decimal:', Decimal('0.1') * 3)
print('Float :', 0.1 * 3)

f = Fraction(1, 3)
print('Fraction:', f, float(f))

# Convert between types
print(Decimal(f.numerator) / Decimal(f.denominator))
