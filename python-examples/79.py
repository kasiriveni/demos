# 79.py - pickle: serialize and deserialize Python objects
import pickle

obj = {'a': 1, 'b': [1, 2, 3]}
data = pickle.dumps(obj)
print('Pickle bytes length:', len(data))
print('Unpickled:', pickle.loads(data))
