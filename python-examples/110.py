# 110.py - pathlib and basic file operations
from pathlib import Path


def demo(tmp_dir='tmp_demo'):
    p = Path(tmp_dir)
    p.mkdir(exist_ok=True)
    f = p / 'sample.txt'
    f.write_text('Line 1\nLine 2\n')
    print('Wrote file:', f)
    print('Content:')
    print(f.read_text())
    # cleanup
    f.unlink()
    p.rmdir()


if __name__ == "__main__":
    demo()
