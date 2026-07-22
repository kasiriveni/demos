# 77.py - sqlite3: simple in-memory database
import sqlite3

con = sqlite3.connect(':memory:')
cur = con.cursor()
cur.execute('CREATE TABLE nums (n INTEGER)')
cur.executemany('INSERT INTO nums (n) VALUES (?)', [(1,), (2,), (3,)])
con.commit()
for row in cur.execute('SELECT n FROM nums'):
    print(row)
con.close()
