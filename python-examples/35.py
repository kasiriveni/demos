# 35.py - Working with JSON
# Parse and serialize JSON using the json module.

import json

data = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "SQL"]
}

# Serialize to string
json_str = json.dumps(data, indent=2)
print(json_str)

# Write to file
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Read from string
parsed = json.loads(json_str)
print(parsed["name"])
