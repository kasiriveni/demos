# 157.py - tomllib: parse TOML files (Python 3.11+)
# `tomllib` (read-only) parses TOML. There's also `tomli` for older versions
# and `tomli_w` for writing TOML (third-party). The `dict_of_strs` and
# `dict_of_ints` examples show how to validate the result of `tomllib.load`
# before using it.

import tomllib
import io
import os


SAMPLE = """
title = "Demo"

[server]
host = "0.0.0.0"
port = 8080
debug = false
allow_origins = ["*"]

[database]
url = "sqlite:///data.db"
pool_size = 5
"""


def parse_text(src: str) -> dict:
    return tomllib.loads(src)


def parse_file(path: str) -> dict:
    with open(path, "rb") as f:                    # tomllib wants binary mode
        return tomllib.load(f)


def validate(cfg: dict) -> None:
    # tomllib does NOT enforce types by itself; check manually.
    assert isinstance(cfg["server"]["port"], int), "port must be int"
    assert isinstance(cfg["database"]["pool_size"], int)
    print("config OK")


if __name__ == "__main__":
    cfg = parse_text(SAMPLE)
    print("in-memory:", cfg)
    validate(cfg)

    # Round-trip through disk
    path = "_example_157.toml"
    with open(path, "w", encoding="utf-8") as f:
        f.write(SAMPLE)
    cfg2 = parse_file(path)
    print("from disk :", cfg2 == cfg)
    os.unlink(path)
