# 147.py - Building a tiny data pipeline with operator and dataclasses
# This file ties together: dataclasses (lightweight record types), the
# `operator` module (functions for built-in operators, so you can pass
# them around as first-class callables), and `functools.reduce` for
# folding a sequence into a single value.

import operator
import functools
from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class Order:
    id: int
    product: str
    qty: int
    price: float

    @property
    def total(self) -> float:
        return self.qty * self.price


orders = [
    Order(1, "book",  2, 12.50),
    Order(2, "pen",   5,  1.20),
    Order(3, "lamp",  1, 24.00),
    Order(4, "book",  1, 12.50),
]

# Use operator.attrgetter / itemgetter to plug into map/sorted/reduce
get_total = operator.attrgetter("total")
print("totals:", [get_total(o) for o in orders])

# Sort by product then price
by_product = sorted(orders, key=operator.attrgetter("product", "price"))
print("sorted by (product, price):", [o.product for o in by_product])

# Group qty by product using a plain dict (see 141 for itertools.groupby)
qty_by_product: dict[str, int] = {}
for o in orders:
    qty_by_product[o.product] = qty_by_product.get(o.product, 0) + o.qty
print("qty by product:", qty_by_product)

# Reduce: total revenue
revenue = functools.reduce(operator.add, map(get_total, orders), 0.0)
print("revenue:", revenue)

# operator.methodcaller: call a method by name on each object
print("ids:", list(map(operator.methodcaller("__str__"), orders)))
