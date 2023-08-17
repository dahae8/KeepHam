import RPi_I2C_driver


mylcd = RPi_I2C_driver.lcd()
mylcd.backlight(0)

def setLine1(text):
    mylcd.lcd_display_string(text, 1)

def setLine2(text):
    mylcd.lcd_display_string(text, 2)

def clear():
    mylcd.lcd_clear()

def off():
    mylcd.backlight(0)