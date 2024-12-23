"""
Source: https://stackoverflow.com/a/21957017
"""

#!/usr/bin/env python3

from http.server import HTTPServer, SimpleHTTPRequestHandler, test

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    test(CORSRequestHandler, HTTPServer, port = 8000)