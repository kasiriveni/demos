# 145.py - Argument clinic: argparse with subcommands, choices, types
# `argparse` covers a lot: positional/optional args, automatic --help, type
# coercion, choices, sub-commands (each with its own parser), and custom
# help. This file shows the structure used in tools like `git`, `docker`,
# `pip`, etc.

import argparse


def cmd_add(args: argparse.Namespace) -> None:
    print(f"add: a={args.a} b={args.b} = {args.a + args.b}")


def cmd_greet(args: argparse.Namespace) -> None:
    print(f"hi {args.name}! (loud={args.loud})")


def positive_int(s: str) -> int:
    n = int(s)
    if n <= 0:
        raise argparse.ArgumentTypeError(f"must be positive, got {n}")
    return n


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="mytool",
        description="Demo CLI with subcommands.",
    )
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_add = sub.add_parser("add", help="add two numbers")
    p_add.add_argument("a", type=float, help="first number")
    p_add.add_argument("b", type=float, help="second number")
    p_add.set_defaults(func=cmd_add)

    p_greet = sub.add_parser("greet", help="say hello")
    p_greet.add_argument("name", choices={"ada", "lin", "alan"}, help="who to greet")
    p_greet.add_argument("--loud", action="store_true", help="shout it")
    p_greet.set_defaults(func=cmd_greet)

    # Shared, global flag that applies to all subcommands
    parser.add_argument("-v", "--verbose", action="count", default=0)
    return parser


def run(argv: list[str]) -> None:
    parser = build_parser()
    args = parser.parse_args(argv)
    if args.verbose:
        print(f"[verbose={args.verbose}] running subcommand: {args.cmd}")
    args.func(args)


if __name__ == "__main__":
    # Simulate a CLI run; replace with sys.argv[1:] for real use.
    run(["-v", "add", "2", "3"])
    run(["greet", "ada", "--loud"])
    try:
        run(["add", "2", "x"])
    except SystemExit:
        pass  # argparse already printed a friendly error
