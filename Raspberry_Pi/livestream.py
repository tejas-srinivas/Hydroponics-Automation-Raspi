import cv2
import requests
import numpy as np

url = 'https://smarthydro-auth-api.onrender.com/receive_video'

cap = cv2.VideoCapture(0)  # Change 0 to the index of your camera if you have multiple cameras

while True:
    ret, frame = cap.read()
    _, img_encoded = cv2.imencode('.jpg', frame)
    response = requests.post(url, data=img_encoded.tobytes(), headers={'Content-Type': 'image/jpeg'})
    print(response)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
