#!/usr/bin/env python
#-*- coding:utf-8 -*-
from time import sleep, ctime, time
import RPi.GPIO as GPIO
import atexit
import threading
import setClcd
import buzzer
import boxArrive
from kafka import KafkaConsumer
import json
import cv2
import zbar
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter(u'%(asctime)s [%(levelname)8s] %(message)s')

now = ctime(time())

file_handler = logging.FileHandler('/home/pi/log/{}.log'.format(now))
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

logger.debug("program started")

groupId = "box_123"
boxId = 123

# GPIO
UV = 16
Solenoid = 26
Green = 14
Red = 15
Button = 18
magneticOut = 5
magneticIn = 6

logger.debug("initialize")

GPIO.setmode(GPIO.BCM)
GPIO.setup([Solenoid, magneticOut, Red], GPIO.OUT, initial=GPIO.HIGH)
GPIO.setup([UV, Green], GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(Button, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(magneticIn, GPIO.IN)

setClcd.clear()
setClcd.setLine1("Enter PW to Open")

terminate = False


logger.debug("run kafka_open")

# 카프카
password = "" 
webOpen = False

def subOpen():
    global webOpen

    consumer = KafkaConsumer(
        "box-open",
        bootstrap_servers=[
            "i9c104.p.ssafy.io:19092",
            "i9c104.p.ssafy.io:19093",
            "i9c104.p.ssafy.io:19094",
        ],
        enable_auto_commit=True,
        group_id=groupId,
        value_deserializer=lambda x: json.loads(x.decode("utf-8")),
        consumer_timeout_ms=1000,
    )

    while True:
        if terminate:
            break

        for message in consumer:
            msg = message.value
            print(msg["boxId"])
            print(msg["type"])

            if msg["type"] == "OPEN" and msg["boxId"] == boxId:
                webOpen = True

        sleep(0.5)

openThread = threading.Thread(target=subOpen)
openThread.start()


logger.debug("run kafka_pw")

def subPw():
    global password

    consumer = KafkaConsumer(
        "box-keyPad",
        bootstrap_servers=[
            "i9c104.p.ssafy.io:19092",
            "i9c104.p.ssafy.io:19093",
            "i9c104.p.ssafy.io:19094",
        ],
        enable_auto_commit=True,
        group_id=groupId,
        value_deserializer=lambda x: json.loads(x.decode("utf-8")),
        consumer_timeout_ms=1000,
    )

    while True:
        if terminate:
            break

        for message in consumer:
            msg = message.value
            print(msg["boxId"])
            print(msg["type"])
            print(msg["content"])

            if msg["type"] == "PASSWORD" and msg["boxId"] == boxId:
                password = msg["content"]

        sleep(0.5)

pwThread = threading.Thread(target=subPw)
pwThread.start()

logger.debug("run keypad")

# 키패드
confirm = False
entered = False
input = ""

def getInput():
    global confirm
    global entered
    global input
    global terminate

    COL = [9, 10, 11]
    ROW = [22, 23, 24, 25]

    GPIO.setmode(GPIO.BCM)
    GPIO.setup([9, 10, 11], GPIO.IN)
    GPIO.setup([22, 23, 24, 25], GPIO.OUT, initial=GPIO.LOW)

    keys = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["*", "0", "#"]
    ]

    prevInput = "x"

    while 1:
        hasInput = False

        if terminate:
            break

        for i in range(4):
            currentRow = ROW[i]

            GPIO.output(currentRow, GPIO.HIGH)

            for j in range(3):
                currentCol = COL[j]

                if GPIO.input(currentCol):
                    hasInput = True

                    char = keys[i][j]
                    if(prevInput != char):

                        length = len(input)

                        if char == "*":
                            if length > 0:
                                input = input[0:length - 1]
                                entered = True
                        elif char == "#":
                            confirm = True
                        else:
                            if length < 16:
                                input = input + char
                                entered = True
                                buzzer.play(1)

                        

                        prevInput = char
                    
                    break

            if hasInput:
                break
            
            GPIO.output(currentRow, GPIO.LOW)


        if not hasInput:
            prevInput = "x"


        sleep(0.2)

inputThread = threading.Thread(target=getInput)
inputThread.start()

# 카메라
def captureQR():
    global input
    global confirm
    global terminate

    cap = cv2.VideoCapture(-1)

    prevQrCode = ""
    qrCode = ""
    scanner = zbar.Scanner()

    while cap.isOpened():
        if terminate:
            break
        ret, frame = cap.read()
        if ret:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            qrRead = ""

            results = scanner.scan(gray)
            for result in results:
                qrRead = result.data

            if qrRead != "":
                qrCode = qrRead.decode('utf-8')

                if prevQrCode != qrCode:
                    prevQrCode = qrCode
                    input = qrCode
                    confirm = True

            if cv2.waitKey(1) & 0xFF == 27: #esc
                break
        else:
            print('no camera!')
            break

    cap.release()
    cv2.destroyAllWindows()

captureThread = threading.Thread(target=captureQR)
captureThread.start()

# 솔레노이드
doorOpened = False
preventBtnEvt = False

def open():
    global doorOpened
    global preventBtnEvt

    setClcd.clear()
    setClcd.setLine1("Open!")
    preventBtnEvt = True
    GPIO.output(UV, GPIO.HIGH)
    GPIO.output(Solenoid, GPIO.LOW)
    GPIO.output(Green, GPIO.HIGH)
    GPIO.output(Red, GPIO.LOW)
    sleep(1)
    doorOpened = True
    setClcd.setLine2("5")
    sleep(1)
    setClcd.setLine2("4")
    sleep(1)
    setClcd.setLine2("3")
    sleep(1)
    setClcd.setLine2("2")
    sleep(1)
    setClcd.setLine2("1")
    sleep(1)
    while doorOpened:
        buzzer.play(3)
        setClcd.setLine1("Please")
        setClcd.setLine2("close the door")
        sleep(1)

    GPIO.output(UV, GPIO.LOW)
    GPIO.output(Solenoid, GPIO.HIGH)
    GPIO.output(Green, GPIO.LOW)
    GPIO.output(Red, GPIO.HIGH)
    sleep(1)
    preventBtnEvt = False
    setClcd.clear()
    setClcd.setLine1("Enter PW to Open")

# 마그네틱
def doorClosed(ch):
    global doorOpened
    print("door closed pin {}".format(ch))
    doorOpened = False

GPIO.add_event_detect(magneticIn, GPIO.FALLING, callback=doorClosed, bouncetime=1000)

# 버튼
def buttonPressed(pin):
    if preventBtnEvt:
        return
    print("button pressed pin{}".format(pin))
    boxArrive.send(boxId)

GPIO.add_event_detect(Button, GPIO.FALLING, callback=buttonPressed, bouncetime=500)

# 종료 프로세스
def exit_handler():
    global terminate
    print("terminating")

    terminate = True

    openThread.join()
    pwThread.join()
    inputThread.join()
    captureThread.join()
    
    setClcd.clear()
    GPIO.cleanup()
    setClcd.setLine1("program died")

atexit.register(exit_handler)

# loop
while 1:
    if entered:
        setClcd.clear()
        setClcd.setLine1("Enter PW to Open")
        setClcd.setLine2(input)
        entered = False
    elif confirm:
        if input == password:
            open()
        else:
            buzzer.play(2)
        input = ""
        confirm = False

    if webOpen:
        open()
        webOpen = False
    
    sleep(0.5)