# 85.py - configparser: read INI-style configs
import configparser

cfg = configparser.ConfigParser()
cfg['DEFAULT'] = {'Server': 'example.com', 'Port': '8080'}
print(cfg['DEFAULT']['Server'])
