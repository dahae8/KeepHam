# 초기 환경 구성

## 라즈베리파이 64비트 설치

## SSH VNC I2C 켜기

> 이후로 SSH를 통한 작업 가능

## 라즈베리파이에서 install.sh 실행

- 실행파일이 아닐 경우

``` shell
chmod 755 install.sh
```

## VNC 설정

1. `/boot/config.txt` 파일 수정

``` ini
hdmi_force_hotplug=1
hdmi_group=2
hdmi_mode=32
```

2. `sudo raspi-config` VNC Resolution 설정

## 카메라 테스트

``` shell
libcamera-hello -t 0
libcamera-jpeg -o test.jpg
```


# periperal

## GPIO 연결


### clcd

GPIO 2: SDA  
GPIO 3: SCL

### keypad

||3<br>GPIO 9|1<br>GPIO 10|5<br>GPIO 11|
|:---:|:---:|:---:|:---:|
|2<br>GPIO 22||||
|7<br>GPIO 23||||
|6<br>GPIO 24||||
|4<br>GPIO 25||||

### magnetic

GPIO 5: output  
GPIO 6: input

### relay

GPIO 16:  LED  
GPIO 26:  Solenoid

### buzzer

GPIO 12: buzzer

### LED

GPIO 14: green  
GPIO 15: red

### button

GPIO 18: button