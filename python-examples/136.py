# 136.py - logging cookbook: loggers, handlers, formatters, propagation
# `logging` is structured: Loggers -> Handlers -> Formatters. You can
# attach multiple handlers to one logger (e.g. console + rotating file),
# set different levels per logger, and use the standard __name__ pattern
# to make module-local loggers that respect a single configuration.

import logging
import logging.handlers
import os
import tempfile

# One root config for the whole app
LOG_PATH = os.path.join(tempfile.gettempdir(), "example_136.log")

# Root logger: WARNING to console, INFO to a rotating file
console = logging.StreamHandler()
console.setLevel(logging.WARNING)
console.setFormatter(logging.Formatter("%(levelname)s %(name)s: %(message)s"))

rotating = logging.handlers.RotatingFileHandler(
    LOG_PATH, maxBytes=2048, backupCount=2
)
rotating.setLevel(logging.INFO)
rotating.setFormatter(logging.Formatter(
    "%(asctime)s %(levelname)s [%(name)s] %(message)s"
))

root = logging.getLogger()
root.setLevel(logging.DEBUG)
root.addHandler(console)
root.addHandler(rotating)

# Module-local loggers
db_log = logging.getLogger("db")
api_log = logging.getLogger("api")


def query_user(uid: int) -> str:
    db_log.debug("querying user %s", uid)
    db_log.info("loaded user %s", uid)
    return f"user-{uid}"


def serve(uid: int) -> None:
    api_log.info("request uid=%s", uid)
    user = query_user(uid)
    api_log.warning("slow response for %s", user)


if __name__ == "__main__":
    serve(1)
    serve(2)
    print("--- log file contents ---")
    with open(LOG_PATH) as f:
        print(f.read()[:600])
    os.unlink(LOG_PATH)
