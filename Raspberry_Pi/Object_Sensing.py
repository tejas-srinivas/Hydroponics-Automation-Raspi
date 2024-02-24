import RPi.GPIO as GPIO
import time
import cv2
import numpy as np
#PIR sensor pin
pir_pin = 18
#Set up PIR sensor
GPIO.setmode(GPIO.BCM)
GPIO.setup(pir_pin, GPIO.IN)
#Set up camera
camera = cv2.VideoCapture(0)
#Loop to capture images when motion is detected
while True:
    #Wait for PIR sensor to detect motion
    if GPIO.input(pir_pin)==1:
        time.sleep(0.1)
        print("Motion detected!")
        camera.capture('image.jpg')
        print("Image captured!")
        break
        time.sleep(0.1)
    # Capture image from camera
    ret, frame = camera.read()
    #Perform image analysis
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blur, 50, 150)
    #Perform image filtering
    kernel = np.ones((5,5),np.float32)/25
    filtered = cv2.filter2D(frame,-1,kernel)
    #Perform image segmentation
    ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(frame, contours, -1, (0,255,0), 3)
    # Display processed image
    cv2.imshow('Edges', edges)
    cv2.waitKey(0)
    cv2.imshow('Processed Image', frame)
    cv2.imshow('Filtered Image', filtered)
    #Save image to file
    filename = 'motion_capture.jpg'
    cv2.imwrite(filename, frame)
    # Wait for user to close window
    cv2.waitKey(0)
    #Clean up GPIO and camera
    GPIO.cleanup()
    camera.release()
    cv2.destroyAllWindows()