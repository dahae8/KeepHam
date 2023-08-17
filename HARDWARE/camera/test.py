# OpenCV 정보 확인 예제
import cv2

capture = cv2.VideoCapture(0)
possible = capture.set(cv2.CAP_PROP_MODE, cv2.CAP_MODE_GRAY)
print(possible)