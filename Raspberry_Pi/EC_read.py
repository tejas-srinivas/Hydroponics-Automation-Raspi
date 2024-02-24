import sys
import RPi.GPIO as GPIO
import Adafruit_DHT
GPIO.setmode(GPIO.BCM)
sys.path.append('../')
import time

# comment and uncomment the lines below depending on your sensor
sensor = Adafruit_DHT.DHT11
# sensor = Adafruit_DHT.DHT11

# DHT pin connects to GPIO 4
sensor_pin = 22

ADS1115_REG_CONFIG_PGA_6_144V        = 0x00 # 6.144V range = Gain 2/3
ADS1115_REG_CONFIG_PGA_4_096V        = 0x02 # 4.096V range = Gain 1
ADS1115_REG_CONFIG_PGA_2_048V        = 0x04 # 2.048V range = Gain 2 (default)
ADS1115_REG_CONFIG_PGA_1_024V        = 0x06 # 1.024V range = Gain 4
ADS1115_REG_CONFIG_PGA_0_512V        = 0x08 # 0.512V range = Gain 8
ADS1115_REG_CONFIG_PGA_0_256V        = 0x0A # 0.256V range = Gain 16

from DFRobot_ADS1115 import ADS1115
from DFRobot_EC      import DFRobot_EC

ads1115 = ADS1115()
ec      = DFRobot_EC()

ec.begin()
while True :
	humidity, temperature = Adafruit_DHT.read_retry(sensor, sensor_pin)  # Use read_retry to retry in case of failure
	#Read your temperature sensor to execute temperature compensation
	temp = 28
	#Set the IIC address
	ads1115.setAddr_ADS1115(0x48)
	#Sets the gain and input voltage range.
	ads1115.setGain(ADS1115_REG_CONFIG_PGA_4_096V)
	#Get the Digital Value of Analog of selected channel
	adc2 = ads1115.readVoltage(2)
	#Convert voltage to EC with temperature compensation
	EC = ec.readEC(adc2['r'],temp)
	print ("Temperature:%.1f ^C EC:%.2f ms/cm " %(temp,EC))
	time.sleep(3)
