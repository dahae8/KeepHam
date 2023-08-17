import cv2
import zbar

cap = cv2.VideoCapture(-1)

prevQrCode = ""
qrCode = ""
scanner = zbar.Scanner()

while cap.isOpened():
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
                print(qrCode)

        if cv2.waitKey(1) & 0xFF == 27: #esc
            break
    else:
        print('no camera!')
        break
    
cap.release()
cv2.destroyAllWindows()