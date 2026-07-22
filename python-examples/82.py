# 82.py - smtplib: send a simple email (example only)
import smtplib
from email.message import EmailMessage

# WARNING: Requires SMTP server and credentials; example shows usage only
msg = EmailMessage()
msg.set_content('Hi from Python')
msg['Subject'] = 'Test'
msg['From'] = 'sender@example.com'
msg['To'] = 'recipient@example.com'

print('smtplib example prepared (not sent)')
