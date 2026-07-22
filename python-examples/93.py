# 93.py - tempfile: create temporary files and directories
import tempfile

with tempfile.TemporaryDirectory() as d:
    print('Temp dir:', d)
    with tempfile.NamedTemporaryFile(dir=d, delete=False) as f:
        f.write(b'hello')
        print('Temp file:', f.name)
