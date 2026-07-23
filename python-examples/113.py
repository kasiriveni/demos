# 113.py - SQLite3 CRUD example (in-memory)
import sqlite3


def demo():
    con = sqlite3.connect(':memory:')
    cur = con.cursor()
    cur.execute('CREATE TABLE todo (id INTEGER PRIMARY KEY, title TEXT, done INTEGER)')
    cur.execute('INSERT INTO todo (title, done) VALUES (?, ?)', ('Write tests', 0))
    cur.execute('INSERT INTO todo (title, done) VALUES (?, ?)', ('Fix bug', 1))
    con.commit()

    for row in cur.execute('SELECT id, title, done FROM todo'):
        print(row)

    cur.execute('UPDATE todo SET done = 1 WHERE id = 1')
    con.commit()
    print('After update:')
    print(list(cur.execute('SELECT id, title, done FROM todo')))
    con.close()


if __name__ == '__main__':
    demo()
