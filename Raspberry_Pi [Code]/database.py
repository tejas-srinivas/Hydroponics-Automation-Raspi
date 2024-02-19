from time import gmtime,strftime
import time
import board
import adafruit_bh1750
from pymongo import MongoClient
from datetime import datetime
from demo_PH_read import read_ph
import Adafruit_DHT
import sys
import RPi.GPIO as GPIO
from DFRobot_ADS1115 import ADS1115
from DFRobot_PH      import DFRobot_PH
from DFRobot_EC      import DFRobot_EC

# Setup GPIO Pins for sensor
exhaust_pin = 17
motor1_pin = 27
motor2_pin = 5
motor3_pin = 13
motor4_pin = 6
growlight_pin = 19

GPIO.setmode(GPIO.BCM)
GPIO.setup(exhaust_pin,GPIO.OUT)
GPIO.setup(motor1_pin,GPIO.OUT)
GPIO.setup(motor2_pin,GPIO.OUT)
GPIO.setup(motor3_pin,GPIO.OUT)
GPIO.setup(motor4_pin,GPIO.OUT)
GPIO.setup(growlight_pin,GPIO.OUT)

# Replace with your MongoDB connection details
MONGODB_URI = 'mongodb+srv://rootUser:root@smarthydro.zpntnvu.mongodb.net/?retryWrites=true&w=majority'
DATABASE_NAME = 'hydroponic_data'
COLLECTION_NAME = 'sensor_data'
COLLECTION_LOG = 'logs'

ADS1115_REG_CONFIG_PGA_6_144V        = 0x00 # 6.144V range = Gain 2/3
ADS1115_REG_CONFIG_PGA_4_096V        = 0x02 # 4.096V range = Gain 1
ADS1115_REG_CONFIG_PGA_2_048V        = 0x04 # 2.048V range = Gain 2 (default)
ADS1115_REG_CONFIG_PGA_1_024V        = 0x06 # 1.024V range = Gain 4
ADS1115_REG_CONFIG_PGA_0_512V        = 0x08 # 0.512V range = Gain 8
ADS1115_REG_CONFIG_PGA_0_256V        = 0x0A # 0.256V range = Gain 16

# Function to connect to MongoDB and insert data
def send_data_to_mongodb(temperature, humidity, ph, ec, lux, timestamp):
    try:
        client = MongoClient(MONGODB_URI)
        db = client[DATABASE_NAME]
        collection = db[COLLECTION_NAME]

        data = {
            'temperature': temperature,
            'humidity': humidity,
            'ph': ph,
            'ec': ec,
            'lux': lux,
            'timestamp': timestamp
        }
        collection.insert_one(data)
        print("Data sent to MongoDB............................................\n")

    except Exception as e:
        print("Error inserting :", str(e))

    finally:
        client.close()
        
def send_logs_to_mongodb(status, timestamp):
    try:
        client = MongoClient(MONGODB_URI)
        db = client[DATABASE_NAME]
        collection = db[COLLECTION_LOG]

        data = {
            'status': status,
            'timestamp': timestamp
        }
        collection.insert_one(data)
        print("Sending log to MongoDB............................................\n")

    except Exception as e:
        print("Error inserting :", str(e))

    finally:
        client.close()
    
    
def turn_on_motor_1():
    GPIO.output(motor1_pin,GPIO.LOW)
    time.sleep(5)
    GPIO.output(motor1_pin,GPIO.HIGH)

def turn_on_motor_2():
    GPIO.output(motor2_pin,GPIO.LOW)
    time.sleep(5)
    GPIO.output(motor2_pin,GPIO.HIGH)
    
def turn_on_motor3():
    GPIO.output(motor3_pin,GPIO.LOW)
    time.sleep(5)
    GPIO.output(motor3_pin,GPIO.HIGH)

def turn_on_motor4():
    GPIO.output(motor4_pin,GPIO.LOW)
    time.sleep(5)
    GPIO.output(motor4_pin,GPIO.HIGH)

ads1115 = ADS1115()
#Set the IIC address
ads1115.setAddr_ADS1115(0x48)
#Sets the gain and input voltage range.
ads1115.setGain(ADS1115_REG_CONFIG_PGA_4_096V)


# comment and uncomment the lines below depending on your sensor
# sensor = Adafruit_DHT.DHT11
# sensor = Adafruit_DHT.DHT11

# DHT pin connects to GPIO 4
# sensor_pin = 22

# Simulated function to read temperature and humidity (replace with actual sensor readings)
def read_temperature_and_humidity():
    sensor = Adafruit_DHT.DHT11
    sensor_pin = 22
    humidity, temperature = Adafruit_DHT.read_retry(sensor, sensor_pin)
    return temperature, humidity

# Simulated function to read pH value (replace with actual sensor readings)
def read_ph_sensor():
    ph = DFRobot_PH() 
    ph.begin() 
    temp,humid = read_temperature_and_humidity()
    #Get the Digital Value of Analog of selected channel
    adc0 = ads1115.readVoltage(0)
    #Convert voltage to PH with temperature compensation
    PH = ph.read_PH(adc0['r'],temp)
    return PH

# Simulated function to read EC value (replace with actual sensor readings)
def read_ec_sensor():
    temp = 28
    ec = DFRobot_EC()
    ec.begin()
	#Get the Digital Value of Analog of selected channel
    adc2 = ads1115.readVoltage(2)
	#Convert voltage to EC with temperature compensation
    EC = ec.readEC(adc2['r'],temp)
    return EC
    
def get_sensor_data():
    # Read sensor values
    temperature, humidity = read_temperature_and_humidity()
    ph = round(read_ph_sensor(),2)
    time.sleep(2)
    ec = round(read_ec_sensor(),2)
    # Get the current timestamp
    timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
    lux_value = get_light_intensity()
    return temperature, humidity, ph, ec, lux_value, timestamp
    
def get_light_intensity():
    i2c = board.I2C()
    sensor = adafruit_bh1750.BH1750(i2c)
    lux_value = sensor.lux
    lux_value = round(lux_value,2)
    return lux_value

try:
    
    while True:
        
        time.sleep(10)
        temp, humid, ph, ec, lux, timestamp = get_sensor_data()
        GPIO.output(motor1_pin,GPIO.HIGH)
        GPIO.output(motor2_pin,GPIO.HIGH)
        GPIO.output(motor3_pin,GPIO.HIGH)
        GPIO.output(motor4_pin,GPIO.HIGH)
        # Send data to MongoDB
        print("Sending sensor data to database.................................")
        send_data_to_mongodb(temp, humid, ph, ec, lux, timestamp)
        
        if temp > 28 :
            GPIO.output(exhaust_pin,GPIO.LOW)
        else:
            GPIO.output(exhaust_pin,GPIO.HIGH)
            
        if lux < 5000 :
            GPIO.output(exhaust_pin,GPIO.LOW)
        else :
            GPIO.output(exhaust_pin,GPIO.HIGH)
        
        if ec < 1.8:
            print("Turning on Nutrients Motor 3")
            status = "Turning on Nutrients Motor 3"
            timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
            send_logs_to_mongodb(status, timestamp)
            turn_on_motor3()
            print("Turning off Nutrients Motor 3")
            
            
            if ph < 5.5:
                print("Turning on PH Up Motor")
                status = "Turning on PH Up Motor"
                timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
                send_logs_to_mongodb(status, timestamp)
                turn_on_motor_1()
                print("Turning off PH Up Motor")
                
                
            if ph > 6.6:
                print("Turning on PH Down Motor")
                status = "Turning on PH Down Motor"
                timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
                send_logs_to_mongodb(status, timestamp)
                turn_on_motor_2()
                print("Turning on PH Down Motor")
                
            
            if ph > 5.2 and ph < 6.8:  
                print("PH levels are optimum")
                status = "PH levels are optimum"
                timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
                send_logs_to_mongodb(status, timestamp)
                time.sleep(5)  
            print("")
            
        if ec >= 2.3:
            print("Pumping water from Motor4")
            status = "Pumping water from Motor4"
            timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
            send_logs_to_mongodb(status, timestamp)
            turn_on_motor4()
            print("Turn off Motor4")
            
            if ph < 5.5:
                print("Turning on PH Up Motor")
                status = "Turning on PH Up Motor"
                timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
                send_logs_to_mongodb(status, timestamp)
                turn_on_motor_1()
                print("Turning off PH Up Motor")
                
                
            if ph > 6.6:
                print("Turning on PH Down Motor")
                status = "Turning on PH Down Motor"
                timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
                send_logs_to_mongodb(status, timestamp)
                turn_on_motor_2()
                print("Turning on PH Down Motor")
                
            
            if ph > 5.2 and ph < 6.8:  
                print("PH levels are optimum")
                status = "PH levels are optimum"
                timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
                send_logs_to_mongodb(status, timestamp)
                time.sleep(5)  
            print("")
            
            
        if ec > 1.8 and ec < 2.3:
            print("EC levels are optimum")
            status = "EC levels are optimum"
            timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
            send_logs_to_mongodb(status, timestamp)
            time.sleep(5)
            if ph < 5.5:
                print("Turning on PH Up Motor")
                status = "Turning on PH Up Motor"
                timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
                send_logs_to_mongodb(status, timestamp)
                turn_on_motor_1()
                print("Turning off PH Up Motor")
                
                
            if ph > 6.6:
                print("Turning on PH Down Motor")
                status = "Turning on PH Down Motor"
                timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
                send_logs_to_mongodb(status, timestamp)
                turn_on_motor_2()
                print("Turning of PH Down Motor")
                
            
            if ph > 5.2 and ph < 6.8:  
                print("PH levels are optimum")
                status = "PH levels are optimum"
                timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
                send_logs_to_mongodb(status, timestamp)
                time.sleep(5)  
            print("")
            
        
        print("..................................................................")
        print("PH:",ph)
        print("EC:",ec)
        print("Temperature:",temp)
        print("Humidity:",humid)
        print("Lux:",lux)
        print("..................................................................")

        # Adjust the interval as needed
        time.sleep(10)
        #print("fetching data from sensor.......................................")

except KeyboardInterrupt:
    pass
    
finally:
    GPIO.cleanup()
