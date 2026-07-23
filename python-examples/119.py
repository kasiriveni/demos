# 119.py - math and statistics (mean, median, mode)
import statistics


def demo():
    data = [1, 2, 2, 3, 4]
    print('Mean:', statistics.mean(data))
    print('Median:', statistics.median(data))
    print('Mode:', statistics.mode(data))


if __name__ == '__main__':
    demo()
