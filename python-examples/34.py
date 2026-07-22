# 34.py - Working with CSV
# Read and write CSV using the standard csv module.

import csv

# Write CSV
with open("people.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "age", "city"])
    writer.writerow(["Alice", 30, "NYC"])
    writer.writerow(["Bob", 25, "LA"])

# Read CSV
with open("people.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)
