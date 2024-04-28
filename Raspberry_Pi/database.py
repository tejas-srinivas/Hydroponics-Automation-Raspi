from time import gmtime,strftime
import time
import board
import adafruit_bh1750
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime
import Adafruit_DHT
import RPi.GPIO as GPIO
from DFRobot_ADS1115 import ADS1115
from DFRobot_PH      import DFRobot_PH
from DFRobot_EC      import DFRobot_EC

# Config Pins
exhaust_pin = 17
motor1_pin = 27
motor2_pin = 5
motor3_pin = 13
motor4_pin = 6
growlight_pin = 19

# Setup GPIO Pins for sensors
GPIO.setmode(GPIO.BCM)
GPIO.setup(exhaust_pin,GPIO.OUT)
GPIO.setup(motor1_pin,GPIO.OUT)
GPIO.setup(motor2_pin,GPIO.OUT)
GPIO.setup(motor3_pin,GPIO.OUT)
GPIO.setup(motor4_pin,GPIO.OUT)
GPIO.setup(growlight_pin,GPIO.OUT)

ADS1115_REG_CONFIG_PGA_4_096V = 0x02 # 4.096V range = Gain 1

ads1115 = ADS1115()
#Set the IIC address
ads1115.setAddr_ADS1115(0x48)
#Sets the gain and input voltage range.
ads1115.setGain(ADS1115_REG_CONFIG_PGA_4_096V)

# Replace with your MongoDB connection details
load_dotenv()
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
CLUSTER_NAME =  os.getenv('CLUSTER_NAME')
MONGODB_URI = f"mongodb+srv://{DATABASE_USER}:{DATABASE_PASSWORD}@{CLUSTER_NAME}.zpntnvu.mongodb.net/?retryWrites=true&w=majority"
DATABASE_NAME = os.getenv('DATABASE')
COLLECTION_NAME = os.getenv('COLLECTION_NAME')
COLLECTION_LOG = os.getenv('COLLECTION_LOG')

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

# Send log messages to the logs collection in MongoDB
def send_logs_to_mongodb(status):
    try:
        client = MongoClient(MONGODB_URI)
        db = client[DATABASE_NAME]
        collection = db[COLLECTION_LOG]
        timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
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
    time.sleep(3)
    GPIO.output(motor1_pin,GPIO.HIGH)

def turn_on_motor_2():
    GPIO.output(motor2_pin,GPIO.LOW)
    time.sleep(3)
    GPIO.output(motor2_pin,GPIO.HIGH)
    
def turn_on_motor3():
    GPIO.output(motor3_pin,GPIO.LOW)
    time.sleep(3)
    GPIO.output(motor3_pin,GPIO.HIGH)

def turn_on_motor4():
    GPIO.output(motor4_pin,GPIO.LOW)
    time.sleep(3)
    GPIO.output(motor4_pin,GPIO.HIGH)

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
    temp, humid = read_temperature_and_humidity()
    
    # Read pH 10 times
    readings = []
    for _ in range(10):
        # Get the Digital Value of Analog of selected channel
        adc0 = ads1115.readVoltage(0)
        # Convert voltage to pH with temperature compensation
        PH = ph.read_PH(adc0['r'], temp)
        readings.append(PH)
    
    # Calculate average
    average_ph = sum(readings) / len(readings)
    return average_ph

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

# function to read Light Intensity
def get_light_intensity():
    i2c = board.I2C()
    sensor = adafruit_bh1750.BH1750(i2c)
    lux_value = sensor.lux
    lux_value = round(lux_value,2)
    return lux_value

# function to get all sensors data
def get_sensor_data():
    # Read sensor values
    temperature, humidity = read_temperature_and_humidity()
    ph = round(read_ph_sensor(),2)
    time.sleep(2)
    ec = round(read_ec_sensor(),2)
    time.sleep(2)
    lux_value = get_light_intensity()
    # Get the current timestamp
    timestamp = time.strftime("%a %b %d %Y %I:%M:%S %p %Z",time.gmtime())
    return temperature, humidity, ph, ec, lux_value, timestamp

# Turns ON/OFF the PH Up Motor
def ph_up_condition():
    print("PH is Low, Turning on PH Up Motor")
    status = "PH is Low, Turning on PH Up Motor"
    send_logs_to_mongodb(status)
    turn_on_motor_1()
    print("Turning off PH Up Motor")
    status = "Turning off PH Up Motor"
    send_logs_to_mongodb(status)

# turns ON/OFF the PH Down Motor
def ph_down_condition():
    print("PH is High, Turning on PH Down Motor")
    status = "PH is High, Turning on PH Down Motor"
    send_logs_to_mongodb(status)
    turn_on_motor_2()
    print("Turning off PH Down Motor")
    status = "Turning off PH Down Motor"
    send_logs_to_mongodb(status)

# turns ON/OFF the EC Up Motor
def ec_up_condition():
    print("EC is low, Turning ON Nutrients Motor 3")
    status = "EC is low, Turning ON Nutrients Motor 3"
    send_logs_to_mongodb(status)
    turn_on_motor3()
    print("Turning off Nutrients Motor 3")
    status = "Turning off Nutrients Motor 3"
    send_logs_to_mongodb(status)

# turns ON/OFF the EC Down Motor
def ec_down_condition():
    print("EC is high, Pumping water from Motor 4")
    status = "EC is high, Pumping water from Motor 4"
    send_logs_to_mongodb(status)
    turn_on_motor4()
    print("Turning off Motor 4")
    status = "Turning off Motor 4"
    send_logs_to_mongodb(status)

try:
    GPIO.output(growlight_pin,GPIO.HIGH)
    GPIO.output(exhaust_pin,GPIO.HIGH)
    print("Press Ctrl + C to exit program")
    while True:
        time.sleep(1)
        temp, humid, ph, ec, lux, timestamp = get_sensor_data()
        GPIO.output(motor1_pin,GPIO.HIGH)
        GPIO.output(motor2_pin,GPIO.HIGH)
        GPIO.output(motor3_pin,GPIO.HIGH)
        GPIO.output(motor4_pin,GPIO.HIGH)
        # Send data to MongoDB
        print("Sending sensor data to database.................................")
        send_data_to_mongodb(temp, humid, ph, ec, lux, timestamp)
        
        # Check Temperature Condition
        if temp > 28 :
            print("Temperature is too high, Exhaust is ON")
            GPIO.output(exhaust_pin,GPIO.LOW)
        else:
            print("Temperature is Good, Exhaust is OFF")
            GPIO.output(exhaust_pin,GPIO.HIGH)

        # Check Intensity Condition   
        if lux < 5000 :
            print("Light Intensity is Low, Grow Lights is ON")
            GPIO.output(growlight_pin,GPIO.LOW)
        else :
            print("Light Intensity is Good, Grow Lights is OFF")
            GPIO.output(growlight_pin,GPIO.HIGH)
        
        # Check EC Down Condition
        if ec < 1.8:
            ec_up_condition()
            time.sleep(60*10) # Wait for 10 minutes after checking EC Value

            if ph < 5.5:
                ph_up_condition()
                time.sleep(60*10) # Wait for 10 minutes after pumping
                
            if ph > 6.6:
                ph_down_condition()
                time.sleep(60*10)  # Wait for 10 minutes after pumping
                
            if ph > 5.2 and ph < 6.8:  
                print("PH levels are optimum")
                status = "PH levels are optimum"
                send_logs_to_mongodb(status)
            print("")
        
        # Check EC Up Condition
        if ec > 2.3:
            ec_down_condition()
            time.sleep(60*10) # Wait for 10 minutes after checking EC value
            
            if ph < 5.5:
                ph_up_condition()
                time.sleep(60*10) # Wait for 10 minutes after pumping
                
            if ph > 6.6:
                ph_down_condition()
                time.sleep(60*10) # Wait for 10 minutes after pumping
                
            if ph > 5.2 and ph < 6.8:  
                print("PH levels are optimum")
                status = "PH levels are optimum"
                send_logs_to_mongodb(status)
            print("")
            
        # Check for EC Optimal Condition    
        if ec > 1.8 and ec < 2.3:
            print("EC levels are optimum")
            status = "EC levels are optimum"
            send_logs_to_mongodb(status)

            if ph < 5.5:
                ph_up_condition()
                time.sleep(60*10) # Wait for 10 minutes after checking the pH Value

            if ph > 6.6:
                ph_down_condition()
                time.sleep(60*10) # Wait for 10 minutes after checking the pH Value
                
            if ph > 5.2 and ph < 6.8:  
                print("PH levels are optimum")
                status = "PH levels are optimum"
                send_logs_to_mongodb(status)
            print("")
            
        print(".........................SENSOR DATA.............................")
        print("PH:",ph)
        print("EC:",ec)
        print("Temperature:",temp)
        print("Humidity:",humid)
        print("Lux:",lux)
        print("..................................................................")
        print("\n")
        # Adjust the interval as needed
        print("Waiting for 15 minutes")
        time.sleep(900) # Wait for 15 minutes before taking another reading
        print("fetching data from sensor.........................................")
        print("\n")

except KeyboardInterrupt:
    pass
    
finally:
    GPIO.cleanup()
