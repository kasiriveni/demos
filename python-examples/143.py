# 143.py - zipfile, gzip, bz2, lzma, zlib in-memory compression
# Python's standard library covers the major compression formats without
# third-party dependencies. `gzip`/`bz2`/`lzma` work with files, and
# `zlib` lets you compress arbitrary bytes (used inside PNG, ZIP, HTTP).

import gzip
import bz2
import lzma
import zlib

text = "the quick brown fox jumps over the lazy dog. " * 50
data = text.encode("utf-8")


def ratio(compressed):
    return f"{len(compressed):>5} bytes ({len(compressed) / len(data):.0%})"


# zlib level demo (0=none, 9=best, default is 6)
for level in (0, 1, 6, 9):
    print(f"zlib level={level:>2}", ratio(zlib.compress(data, level)))


# Streaming APIs
import io
for name, opener in (("gzip", gzip.open), ("bz2", bz2.open), ("lzma", lzma.open)):
    buf = io.BytesIO()
    with opener(buf, "wb") as f:
        f.write(data)
    out = buf.getvalue()
    print(f"{name:>5}: wrote {len(out)} bytes, ratio={len(out)/len(data):.0%}")

# round-trip a single gzip blob
gz = gzip.compress(data)
print("gzip round trip ok:", gzip.decompress(gz) == data)

# zlib + checksum (adler32, crc32)
adler = zlib.adler32(data)
crc = zlib.crc32(data)
print(f"adler32={adler:#x}  crc32={crc:#x}")
