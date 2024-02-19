import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(17,GPIO.OUT)
GPIO.setwarnings(False)
GPIO.output(17,GPIO.HIGH)
try:
	while True:
		GPIO.output(17,GPIO.HIGH)
		GPIO.output(17,GPIO.LOW)
		time.sleep(100000)
		GPIO.output(17,GPIO.HIGH)
		time.sleep(7)

except KeyboardInterrupt:
        pass

finally:
    GPIO.cleanup() 




