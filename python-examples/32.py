# 32.py - File Reading
# Read text files with open(). Always close the file (or use 'with').

# Using 'with' is the recommended approach - it auto-closes.
with open("sample.txt", "w") as f:
    f.write("Hello\nWorld\nPython\n")

with open("sample.txt", "r") as f:
    contents = f.read()
    print(contents)

# Read line by line
with open("sample.txt", "r") as f:
    for line in f:
        print(line.strip())
