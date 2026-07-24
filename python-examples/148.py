# 148.py - string and bytes: encodings, codecs, BOM, errors='replace'
# Python text is Unicode, but the wire is bytes. `str.encode()` and
# `bytes.decode()` default to UTF-8 (good). `codecs.open()` is the file
# equivalent. This file explores common encoding edge cases and the
# built-in codecs shipped with the stdlib (rot13, base64, hex, utf-16,
# utf-7, etc.).

import codecs
import io


def demo_utf():
    s = "naïve café — 日本語 — emoji 🐍"
    encoded = s.encode("utf-8")
    print("utf-8 length:", len(encoded), "bytes")
    print("round trip  :", encoded.decode("utf-8") == s)

    # Errors policy: strict (default) raises; 'replace' inserts �
    bad = b"abc\xffdef"
    print("strict   :", end=" ")
    try:
        bad.decode("utf-8")
    except UnicodeDecodeError as e:
        print("raises", e)
    print("replace  :", repr(bad.decode("utf-8", errors="replace")))
    print("ignore   :", repr(bad.decode("utf-8", errors="ignore")))


def demo_builtin_codecs():
    src = "Hello, world!"
    for enc in ("ascii", "utf-8", "utf-16", "utf-32", "idna"):
        try:
            print(f"{enc:>8}: {src.encode(enc)!r}")
        except UnicodeEncodeError as e:
            print(f"{enc:>8}: error {e}")

    # rot_13: a text codec
    s = "Python is fun"
    print("rot13:", codecs.encode(s, "rot_13"))


def demo_bom():
    # UTF-8 with BOM (Byte Order Mark) - some Windows tools emit this.
    with io.BytesIO() as buf:
        with codecs.getwriter("utf-8-sig")(buf) as f:
            f.write("hello")
        print("utf-8-sig bytes:", buf.getvalue())


if __name__ == "__main__":
    demo_utf()
    demo_builtin_codecs()
    demo_bom()
