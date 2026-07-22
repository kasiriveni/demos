# 83.py - email.message: build email messages
from email.message import EmailMessage

msg = EmailMessage()
msg['From'] = 'a@example.com'
msg['To'] = 'b@example.com'
msg['Subject'] = 'Hello'
msg.set_content('This is a plain text body')
print(msg)
