# 8.py - If, Elif, Else
# Conditional branching in Python uses indentation (4 spaces).

score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Score: {score}, Grade: {grade}")
