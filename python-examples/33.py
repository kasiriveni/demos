# 33.py - File Writing
# Write and append to files.

# Write (overwrites existing file)
with open("output.txt", "w") as f:
    f.write("First line\n")
    f.write("Second line\n")

# Append
with open("output.txt", "a") as f:
    f.write("Appended line\n")

with open("output.txt", "r") as f:
    print(f.read())
