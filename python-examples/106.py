# 106.py - Regular expressions: find emails
import re


TEXT = """
Contact us at support@example.com or sales@domain.org.
Also reach out to foo.bar+baz@sub.example.co.uk for advanced queries.
"""

EMAIL_RE = re.compile(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+')


if __name__ == "__main__":
    print('Found emails:')
    for m in EMAIL_RE.findall(TEXT):
        print('-', m)
