import RPi.GPIO as GPIO
from time import sleep

Green = 14
Red = 15

GPIO.setmode(GPIO.BCM)
GPIO.setup([Green, Red], GPIO.OUT, initial=GPIO.LOW)

GPIO.output(Green, GPIO.HIGH)
GPIO.output(Red, GPIO.HIGH)

sleep(5)


GPIO.output(Green, GPIO.LOW)
GPIO.output(Red, GPIO.LOW)

GPIO.cleanup()