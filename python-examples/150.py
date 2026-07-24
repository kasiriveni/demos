# 150.py - atexit, signal, faulthandler: process lifecycle and debugging
# Python gives you hooks for the end of a program, OS signals, and
# hard-crash diagnostics without external tools.

import atexit
import signal
import faulthandler
import os
import sys
import time


# --- atexit: registered functions run on normal interpreter shutdown. ---
@atexit.register
def cleanup() -> None:
    print("[atexit] normal shutdown: flushing buffers, etc.")


# --- signal: install handlers for OS signals. ---
def handle_sigint(signum, frame):
    # Replace the default KeyboardInterrupt with a graceful shutdown.
    print(f"[signal] caught SIGINT ({signum}); shutting down politely")
    sys.exit(0)


# On Windows, SIGTERM is not always available, so register SIGBREAK too.
if hasattr(signal, "SIGINT"):
    signal.signal(signal.SIGINT, handle_sigint)
if hasattr(signal, "SIGTERM"):
    signal.signal(signal.SIGTERM, handle_sigint)
if hasattr(signal, "SIGBREAK"):
    signal.signal(signal.SIGBREAK, handle_sigint)


# --- faulthandler: dump tracebacks on hard crashes (segfaults, etc.). ---
# Enable early so the dumps include whatever happens next.
faulthandler.enable()
# Or, dump on a specific signal:
if hasattr(signal, "SIGUSR1"):
    faulthandler.register(signal.SIGUSR1)


if __name__ == "__main__":
    # PID is useful when looking at /proc/<pid>/maps or sending signals.
    print("pid:", os.getpid(), "waiting 0.5s ...")
    time.sleep(0.5)
    print("done")
    # When the script ends normally, [atexit] fires.
    # On Ctrl-C, our SIGINT handler runs instead of the default.
