import RPi.GPIO as GPIO
from time import sleep
import atexit

Green = 14
Red = 15
magneticOut = 5
magneticIn = 6

GPIO.setmode(GPIO.BCM)
GPIO.setup([ Green, Red ], GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(magneticOut, GPIO.OUT, initial=GPIO.HIGH)
GPIO.setup(magneticIn, GPIO.IN)


def exit_handler():
    GPIO.cleanup()
    print("cleaned")

atexit.register(exit_handler)

def doorClosed(ch):
    print(ch)

    GPIO.output(Green, GPIO.HIGH)
    GPIO.output(Red, GPIO.HIGH)

    sleep(5)


    GPIO.output(Green, GPIO.LOW)
    GPIO.output(Red, GPIO.LOW)


GPIO.add_event_detect(magneticIn, GPIO.FALLING, callback=doorClosed, bouncetime=200)

while True:
    sleep(1)