# 115.py - subprocess example (run external command)
import subprocess


def demo():
    # Run Python interpreter with --version and capture output
    res = subprocess.run(['python', '--version'], capture_output=True, text=True)
    print('Return code:', res.returncode)
    print('Output:', res.stdout.strip() or res.stderr.strip())


if __name__ == '__main__':
    demo()
