# 128.py - Weak references (weakref module)
# A weakref lets you hold a reference to an object without preventing it
# from being garbage-collected. Useful for caches, registries, and
# object graphs where you want to observe a target but never extend its
# lifetime. The referent can also ask to be notified when it is collected.

import weakref
import gc


class Big:
    def __init__(self, payload: str):
        self.payload = payload


# Plain (strong) reference keeps the object alive
held_strong = Big("alive")
ref = weakref.ref(held_strong)
print("ref alive?", ref() is held_strong)

# A weakref by itself does NOT keep the object alive
ref_alone = weakref.ref(Big("transient"))
print("ref_alone alive before gc?", ref_alone() is not None)
gc.collect()
print("ref_alone alive after gc? ", ref_alone() is not None)


# A WeakValueDictionary stores weak references as values; entries vanish
# when the key/value is collected.
cache: weakref.WeakValueDictionary[str, Big] = weakref.WeakValueDictionary()


def make(name: str) -> Big:
    obj = Big(name)
    cache[name] = obj
    return obj


b = make("only-on-demand")
print("cache has 'only-on-demand'? ", "only-on-demand" in cache, "len=", len(cache))
del b
gc.collect()
print("after del, 'only-on-demand' in cache?", "only-on-demand" in cache)


# A finalizer (Python 3.0+ style: weakref.finalize)
class Tracked:
    def __init__(self, tag):
        self.tag = tag
        self._finalizer = weakref.finalize(self, print, f"Tracked({tag!r}) was collected")


t = Tracked("temp")
t_ref = weakref.ref(t)
del t
gc.collect()
print("Tracked still around?", t_ref() is not None)  # finalizer ran on collection
