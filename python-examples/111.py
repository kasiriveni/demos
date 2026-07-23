# 111.py - JSON read/write and pretty-print
import json


DATA = {
    "users": [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"}
    ]
}


def demo(path='data.json'):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(DATA, f)

    with open(path, 'r', encoding='utf-8') as f:
        obj = json.load(f)
    print('Loaded JSON:', json.dumps(obj, indent=2))


if __name__ == '__main__':
    demo()
