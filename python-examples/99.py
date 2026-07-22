# 99.py - tarfile: create and list tar archives
import tarfile

with tarfile.open('example.tar', 'w') as t:
    # Add this script file as demo
    t.add(__file__, arcname='script.py')

with tarfile.open('example.tar', 'r') as t:
    print(t.getnames())
