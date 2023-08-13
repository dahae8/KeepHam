import RPi.GPIO as GPIO
from time import sleep
import atexit

COL = [9, 10, 11]
ROW = [22, 23, 24, 25]

GPIO.setmode(GPIO.BCM)
GPIO.setup([9, 10, 11], GPIO.IN)
GPIO.setup([22, 23, 24, 25], GPIO.OUT, initial=GPIO.LOW)


def exit_handler():
    GPIO.cleanup()
    print("end")

atexit.register(exit_handler)

keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"]
]

word = ""

prevInput = "x"

while 1:
    hasInput = False

    for i in range(4):
        currentRow = ROW[i]

        GPIO.output(currentRow, GPIO.HIGH)

        for j in range(3):
            currentCol = COL[j]

            if GPIO.input(currentCol):
                hasInput = True

                char = keys[i][j]
                if(prevInput != char):
                    print(char)
                    prevInput = char
                
                break

        if hasInput:
            break
        
        GPIO.output(currentRow, GPIO.LOW)


    if not hasInput:
        prevInput = "x"


    sleep(0.2)
