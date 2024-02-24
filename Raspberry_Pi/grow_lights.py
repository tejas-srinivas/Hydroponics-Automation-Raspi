import board
import adafruit_bh1750
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(17,GPIO.OUT)

i2c = board.I2C()
sensor = adafruit_bh1750.BH1750(i2c)
grow_light_pin = 19

try:
    while True:
        lux_value = sensor.lux
        lux = round(lux_value,2)
        # Check Intensity Condition   
        if lux < 5000 :
            print("Light Intensity is Low, Grow Lights is ON")
            GPIO.output(grow_light_pin,GPIO.LOW)
        else :
            print("Light Intensity is Good, Grow Lights is OFF")
            GPIO.output(grow_light_pin,GPIO.HIGH)
        print(lux_value)
        time.sleep(10)
        
except KeyboardInterrupt:
    pass

finally:
    GPIO.cleanup()
