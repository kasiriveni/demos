# 58.py - Logging: use the logging module instead of print for apps
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s:%(message)s')
logger = logging.getLogger(__name__)

logger.debug('This is a debug message')
logger.info('Starting process')
logger.warning('This is a warning')
try:
    1 / 0
except ZeroDivisionError:
    logger.exception('Caught division error')
