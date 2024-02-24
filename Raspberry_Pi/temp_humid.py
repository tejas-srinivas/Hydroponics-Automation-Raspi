import RPi.GPIO as GPIO
import Adafruit_DHT
import time 

GPIO.setmode(GPIO.BCM)
GPIO.setup(17,GPIO.OUT)
# comment and uncomment the lines below depending on your sensor
sensor = Adafruit_DHT.DHT11
sensor_pin = 22

try:
        while True:
            humidity, temperature = Adafruit_DHT.read_retry(sensor, sensor_pin)  # Use read_retry to retry in case of failure
            if humidity is not None and temperature is not None:
                # Uncomment the line below to convert to Fahrenheit
                temperatureF = temperature * 9/5.0 + 32
                if temperature > 28 :
                        GPIO.output(17,GPIO.LOW)
                else:
                        GPIO.output(17,GPIO.HIGH)
                print("Temp={0:0.1f}ºC, Temp={1:0.1f}ºF, Humidity={2:0.1f}%".format(temperature, temperatureF, humidity))
            else:
                GPIO.output(17,GPIO.HIGH)
                print("Sensor failure. Check wiring.")
        
except KeyboardInterrupt:
        pass

finally:
    GPIO.cleanup() 

