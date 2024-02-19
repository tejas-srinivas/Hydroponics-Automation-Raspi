import time
import board
import adafruit_bh1750

i2c = board.I2C()
sensor = adafruit_bh1750.BH1750(i2c)

while True:
    lux_value = sensor.lux
    lux_value = round(lux_value,2)
    print(lux_value)
    time.sleep(10)
