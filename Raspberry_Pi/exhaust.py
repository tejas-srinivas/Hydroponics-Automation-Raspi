import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(17,GPIO.OUT)
GPIO.setwarnings(False)

try:
	while True:
		GPIO.output(17,GPIO.LOW)
		time.sleep(100000)
		GPIO.output(17,GPIO.HIGH)
		
except KeyboardInterrupt:
        pass

finally:
    GPIO.cleanup() 




