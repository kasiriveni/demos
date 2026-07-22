# 84.py - argparse: command-line argument parsing
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--name', default='world')
args = parser.parse_args([])  # example: replace with None to use sys.argv
print(f'Hello, {args.name}!')
