# 80.py - http.server: simple HTTP file server
from http.server import SimpleHTTPRequestHandler, HTTPServer

def run(server_class=HTTPServer, handler=SimpleHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler)
    print('Serving on port 8000')
    # httpd.serve_forever()

if __name__ == '__main__':
    print('Example: run SimpleHTTPServer manually to serve files')
