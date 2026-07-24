# 121.py - Match statement (structural pattern matching, Python 3.10+)
# The `match` statement compares a value against patterns. It is more powerful
# than a chain of `if/elif` because patterns can destructure sequences, maps,
# and classes, and can bind names to captured sub-values.

def http_status(status: int) -> str:
    match status:
        case 200:
            return "OK"
        case 301 | 302 | 303:                       # OR-pattern
            return "Redirect"
        case 400:
            return "Bad Request"
        case 404:
            return "Not Found"
        case 500 | 502 | 503:
            return "Server Error"
        case code if 100 <= code < 200:            # guard with capture
            return "Informational"
        case _:                                     # wildcard (default)
            return "Unknown"


def describe_point(point) -> str:
    # Pattern matching on sequences with capture and rest-binding
    match point:
        case (0, 0):
            return "origin"
        case (0, y):
            return f"on Y axis at y={y}"
        case (x, 0):
            return f"on X axis at x={x}"
        case (x, y):
            return f"point ({x}, {y})"
        case _:
            return "not a 2D point"


def describe_shape(shape) -> str:
    # Match against a mapping/dict-like pattern
    match shape:
        case {"kind": "circle", "r": r}:
            return f"circle radius={r}"
        case {"kind": "rect", "w": w, "h": h}:
            return f"rect {w}x{h}"
        case {"kind": kind}:
            return f"unknown shape: {kind}"


if __name__ == "__main__":
    for s in (200, 301, 404, 599, 42):
        print(s, "->", http_status(s))

    for p in [(0, 0), (0, 5), (3, 0), (4, 7), (9,)]:
        print(p, "->", describe_point(p))

    for sh in ({"kind": "circle", "r": 3}, {"kind": "rect", "w": 2, "h": 4},
               {"kind": "polygon", "sides": 5}):
        print(sh, "->", describe_shape(sh))
