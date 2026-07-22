# 86.py - unittest: simple test case
import unittest

def add(a, b):
    return a + b

class TestAdd(unittest.TestCase):
    def test_sum(self):
        self.assertEqual(add(2, 3), 5)

if __name__ == '__main__':
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
