import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(6,GPIO.OUT)
GPIO.setwarnings(False)
try:
	while True:
		GPIO.output(6,GPIO.LOW)
		time.sleep(5)
		GPIO.output(6,GPIO.HIGH)

except KeyboardInterrupt:
        pass

finally:
    GPIO.cleanup() 
