# 114.py - argparse simple CLI
import argparse


def main():
    p = argparse.ArgumentParser(description='Greet someone')
    p.add_argument('name')
    p.add_argument('--times', '-t', type=int, default=1)
    args = p.parse_args()
    for _ in range(args.times):
        print(f'Hello, {args.name}!')


if __name__ == '__main__':
    main()
