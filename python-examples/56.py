# 56.py - Datetime: parsing, formatting, timezones (basic)
from datetime import datetime, timedelta, timezone

now = datetime.now()
print("Now:", now)

# Formatting
print(now.strftime("%Y-%m-%d %H:%M:%S"))

# Parsing
dt = datetime.strptime("2024-01-15 12:34:56", "%Y-%m-%d %H:%M:%S")
print("Parsed:", dt)

# Timezone-aware UTC
utc = datetime.now(timezone.utc)
print("UTC:", utc)

# Simple arithmetic
print("Plus 3 days:", now + timedelta(days=3))
