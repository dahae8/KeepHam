import RPi.GPIO as GPIO
from time import sleep
import atexit

Green = 14
Red = 15
Button = 18

GPIO.setmode(GPIO.BCM)
GPIO.setup([ Green, Red], GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(Button, GPIO.IN, pull_up_down=GPIO.PUD_UP)


def exit_handler():
    GPIO.cleanup()
    print("cleaned")

atexit.register(exit_handler)

def buttonPressed(ch):
    print(ch)

    GPIO.output(Green, GPIO.HIGH)
    GPIO.output(Red, GPIO.HIGH)

    sleep(5)


    GPIO.output(Green, GPIO.LOW)
    GPIO.output(Red, GPIO.LOW)


GPIO.add_event_detect(Button, GPIO.FALLING, callback=buttonPressed, bouncetime=100)

while True:
    sleep(1)