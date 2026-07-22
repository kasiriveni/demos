# 61.py - Subprocess: run external commands safely
import subprocess

# Run a simple command and capture output
result = subprocess.run(["python", "-c", "print('hi')"], capture_output=True, text=True)
print('Return code:', result.returncode)
print('Stdout:', result.stdout.strip())

# Use check=True to raise on non-zero exit
try:
    subprocess.run(["python", "-c", "import sys; sys.exit(2)"], check=True)
except subprocess.CalledProcessError as e:
    print('Command failed with', e.returncode)
