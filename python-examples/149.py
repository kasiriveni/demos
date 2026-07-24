# 149.py - unittest advanced: setUp/tearDown, subtests, mocking, skipping
# `unittest` is the original Python test framework. Beyond assertEqual it
# gives you shared fixtures (setUp/tearDown), parameterized subtests,
# skipping, expected-failure, and TestLoader.discover for whole trees.

import unittest
import unittest.mock as mock


def slow_sum(values):
    return sum(values)


class TestArithmetic(unittest.TestCase):
    def setUp(self) -> None:
        # Runs before every test method - perfect for per-test fixtures.
        self.data = [1, 2, 3, 4, 5]

    def tearDown(self) -> None:
        # Runs after every test, even if the test raised.
        self.data = None

    def test_sum(self) -> None:
        self.assertEqual(slow_sum(self.data), 15)

    def test_sum_with_mock(self) -> None:
        # Replace the built-in `sum` with a controllable mock.
        with mock.patch("__main__.sum", return_value=999) as m:
            self.assertEqual(slow_sum(self.data), 999)
            m.assert_called_once()

    def test_parametric(self) -> None:
        # subTest: a single test method, multiple cases.
        for n in range(10):
            with self.subTest(n=n):
                self.assertGreater(slow_sum([1] * n), -1)  # always true

    @unittest.skip("demonstration of skipping")
    def test_skipped(self) -> None:
        self.fail("never runs")

    @unittest.expectedFailure
    def test_known_broken(self) -> None:
        # Marks the test as expected to fail; passes if it does.
        self.assertEqual(1, 2)


if __name__ == "__main__":
    # verbosity=2 shows each test method by name.
    unittest.main(verbosity=2, argv=["x", "TestArithmetic"], exit=False)
