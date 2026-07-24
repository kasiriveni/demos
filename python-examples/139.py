# 139.py - Text wrapping, indentation, and pretty printing (textwrap, pprint)
# `textwrap` trims, indents, and reflows paragraphs. `pprint` prints data
# structures in a human-readable form that respects line width and depth.

import textwrap
from pprint import pprint, pformat


def demo_textwrap():
    blob = "  Lorem ipsum dolor sit amet, consectetur adipiscing elit. " * 5
    print(textwrap.fill(blob, width=40))
    print()
    print(textwrap.fill(blob, width=40, initial_indent="> ", subsequent_indent="  "))

    # `dedent` removes a common leading-whitespace prefix - perfect for
    # multi-line string literals that you want to align visually with
    # surrounding code.
    msg = textwrap.dedent("""
        line one
          indented line two
        line three
    """)
    print("dedented:", repr(msg))

    # `shorten` cuts to fit, with a placeholder
    print("shorten:", textwrap.shorten("supercalifragilisticexpialidocious " * 3, width=30))


def demo_pprint():
    data = {
        "users": [{"id": i, "name": f"user-{i}", "tags": ["a", "b"]} for i in range(3)],
        "meta": {"count": 3, "version": 1, "active": True},
    }
    pprint(data, width=40, depth=2, sort_dicts=False)

    # `pformat` returns the pretty string instead of printing
    rendered = pformat(data, width=30)
    print("\npformat line count:", rendered.count("\n") + 1)


if __name__ == "__main__":
    demo_textwrap()
    print()
    demo_pprint()
