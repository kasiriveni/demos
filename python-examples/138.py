# 138.py - String formatting cookbook: format() spec, Template, % style
# Python has three string-formatting styles:
#   1) f-strings / str.format() with a format spec like :>10.2f
#   2) string.Template - safe replacement for user-supplied templates
#   3) printf-style % formatting (legacy; still everywhere)
# This file shows the first two, and a small replacement field walk-through.

import string


def demo_format_spec():
    n = 1234.5678
    for spec in [".2f", "10.2f", "010.2f", ",.0f", "e", "x", "b", "X"]:
        print(f"  {n:>{len(spec)+2}} = {n:{spec}}")
    print(f"  hex  : {255:#x}")
    print(f"  align: [{'hi':<10}][{'hi':>10}][{'hi':^10}]")
    print(f"  date : {__import__('datetime').date(2026,7,24):%Y-%m-%d}")


def demo_template():
    # string.Template is the right tool when the format string comes from
    # an untrusted source: $-placeholders don't allow attribute access or
    # arbitrary expressions like f-strings do.
    t = string.Template("Hello $name, balance: $amount")
    print(t.substitute(name="Ada", amount=42))

    # If you need a custom pattern (e.g. ${{...}}):
    class BraceTemplate(string.Template):
        delimiter = "{{"
        idpattern = r"(?a:[_a-z][_a-z0-9]*)"

    bt = BraceTemplate("Hi {{name}}!")
    print(bt.substitute(name="world"))


def demo_named_fields():
    # str.format() with explicit indices/names - useful for i18n catalogs.
    s = "{0} loves {what}".format("she", what="cats")
    print(s)


if __name__ == "__main__":
    print("format spec:")
    demo_format_spec()
    print("\nTemplate:")
    demo_template()
    print("\nformat():")
    demo_named_fields()
