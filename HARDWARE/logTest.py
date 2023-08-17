from time import sleep, ctime, time
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter(u'%(asctime)s [%(levelname)8s] %(message)s')

now = ctime(time())

file_handler = logging.FileHandler('/home/pi/log/{}.log'.format(now))
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

sleep(1)

logger.debug("program started")