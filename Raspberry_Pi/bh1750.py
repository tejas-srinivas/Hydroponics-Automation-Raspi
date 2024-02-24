import time
import board
import adafruit_bh1750
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
growlight_pin = 19
GPIO.setup(growlight_pin,GPIO.OUT)
i2c = board.I2C()
sensor = adafruit_bh1750.BH1750(i2c)

try:
    while True:
        lux_value = sensor.lux
        lux_value = round(lux_value,2)
        if lux_value < 5000:
            GPIO.output(growlight_pin,GPIO.LOW)
        else:
            GPIO.output(growlight_pin,GPIO.HIGH)
        print(lux_value)
        time.sleep(10)
        
except KeyboardInterrupt:
        pass

finally:
    GPIO.cleanup() 


