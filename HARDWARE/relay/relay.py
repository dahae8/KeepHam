import RPi.GPIO as GPIO
from time import sleep
import atexit

LED = 16
Solenoid = 26

GPIO.setmode(GPIO.BCM)
GPIO.setup([LED, Solenoid], GPIO.OUT, initial=GPIO.HIGH)


def exit_handler():
    GPIO.cleanup()
    print("end")

atexit.register(exit_handler)

# GPIO.output(LED, GPIO.HIGH)

# sleep(3)

# GPIO.output(LED, GPIO.LOW)


GPIO.output(LED, GPIO.LOW)

sleep(2)

GPIO.output(LED, GPIO.HIGH)

sleep(2)


GPIO.output(Solenoid, GPIO.LOW)

sleep(2)

GPIO.output(Solenoid, GPIO.HIGH)