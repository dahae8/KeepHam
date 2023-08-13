import RPi_I2C_driver
import time

mylcd = RPi_I2C_driver.lcd()
mylcd.backlight(0)

mylcd.lcd_display_string("Hello", 1)
mylcd.lcd_display_string("test", 2)

time.sleep(3)

mylcd.lcd_clear()
time.sleep(1)
mylcd.backlight(0)