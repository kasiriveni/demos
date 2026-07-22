# 78.py - shelve: simple persistent dict-like storage
import shelve

with shelve.open('demo_shelf.db') as db:
    db['count'] = db.get('count', 0) + 1
    print('Run count:', db['count'])
