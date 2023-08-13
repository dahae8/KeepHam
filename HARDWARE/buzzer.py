import RPi.GPIO as GPIO
from time import sleep

buzzer = 12

GPIO.setmode(GPIO.BCM)
GPIO.setup(buzzer, GPIO.OUT, initial=GPIO.LOW)

def play(cnt):
    pwm = GPIO.PWM(buzzer, 1174)
    for _ in range(cnt):
        pwm.start(50)
        sleep(0.01)
        pwm.stop()
        sleep(0.05)
