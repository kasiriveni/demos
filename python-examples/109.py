# 109.py - Simple TCP echo server + client (localhost)
import socket
import threading


def echo_server(host='127.0.0.1', port=50007):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((host, port))
        s.listen(1)
        conn, addr = s.accept()
        with conn:
            data = conn.recv(1024)
            if data:
                conn.sendall(data)


def echo_client(message, host='127.0.0.1', port=50007):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((host, port))
        s.sendall(message.encode())
        data = s.recv(1024)
        print('Received back:', data.decode())


if __name__ == "__main__":
    srv = threading.Thread(target=echo_server, daemon=True)
    srv.start()
    # Give the server a moment to start
    import time

    time.sleep(0.1)
    echo_client('hello world')
