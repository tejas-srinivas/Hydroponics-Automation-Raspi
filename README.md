# Automation of Hydroponic Farming System using IoT [RasPi]

## Why we need Hydroponics?
It's undoubtedly true across all cultures that agriculture and food growth is not just a necessity, but is also very expensive. Agriculture is expensive in amount of land used, time spent to get a harvest and even energy burned to obtain quality. While humans can expect another 8 billion people over the next 3 decades; we need to seriously address the fact that as of today 90% of all farmable land is already used at its max capacity. The technology to solve feeding 8 billion people is available and also removes the costly impacts of large soil based farms, it’s called hydroponic farming. Hydroponic farms save vital land usage by summing farms up into much smaller areas. Hydroponic gardens save time/money at food production because it's quicker to achieve an efficient crop quality.

## Why Automation of Hydroponic Farming?
The goal of this research project was to design, build, and test a low-cost prototype system to automate and control critical variables of the environment in a containerized hydroponic garden. Optimizing the production of hydroponic shipping container systems for cost-efficiency and ease of operation could revitalize the health of low-income and urban communities located in food deserts. With these systems, communities would have close access to healthier, more natural food options year-round. By creating simple technology that optimizes plant yield at the lowest cost, more research can be conducted to study the potential of hydroponics to improve environmental sustainability and end hunger, locally and abroad. This project used Raspberry Pi microcontroller technology and an array of sensors to measure pH, conductivity; temperature, humidity; and the photosynthetically active radiation Grow lights. The data compiled by the system is uploaded to the Internet, where it can be viewed remotely. Conductivity, pH, temperature, humidity can be monitored and regulated continuously without human intervention. The completed system has the potential to control the environment at a substantially lower cost than most commercially available equipment on the market.

![Screenshot of the System](frontend/src/Images/System.jpg?raw=true "Hydroponic System")
![Screenshot of the Crops](frontend/src/Images/Crops.jpg?raw=true "Hydroponic Crops")

## Hardware Requirements
1. Raspbery Pi - 4/5 Model
2. pH Sensor - DFRobot
3. EC Sensor - DFRobot
4. Temperature, Humidity Sensor - DHT11 / DHT22
5. Light Intensity Sensor - BH1750
6. 8x Channel Relay Module
7. 5 AC Motors
8. Grow Lights for Hydroponics
9. Analog to Digital Converters - ADS1115
10. Webcam for Pest Dectection / Live Monitoring

## System Architecture Model
![Screenshot of the Crops](frontend/src/Images/Architecture.jpg?raw=true "Hydroponic Crops")

## Glimpse of the website
## [Link](https://smarthydroponics.vercel.app/)

![Screenshot of Landing Page](frontend/src/Images/LandingPage.png?raw=true "Home Page")

## Dashboard
![Screenshot of Web Dashboard](frontend/src/Images/Dashboard.png?raw=true "Dashboard")

This Project is built using.\
1. React.JS (Inerfaces)
2. Python Flask (Api Handling)
3. MongoDB (Database)
4. Vercel and Render (Deployment Platform)

To see the live demo, visit: https://smarthydroponics.vercel.app/ 
## [Link](https://smarthydroponics.vercel.app/)

Dependencies of React App

1. Axios Package
### `npm install axios`

2. ChartJS-2 - chart library for designing responsive charts.
### `npm install react-chartjs-2 chartjs`

3. Recoil State -  A recoil based state management library for React applications. It helps in managing global states easily
### `npm install recoil`

4. Moment - Used to format date from timestamp in API response.
### `npm install moment`

5. React-Router-dom - Necessary package for routing within a single page application(SPA).
### `npm install react-router-dom`


Dependencies of Flask App

1. Flask
### `pip install flask`

2. PyMongo - A python driver for working with MongoDB.
### `pip install pymongo[ssl]`

3. Bycrypt - This module was used to hash passwords before storing them into the database. 
### `pip install bcrypt`

4. Dot-env - It helps us to hide our sensitive information like SECRET_KEY by keeping it out of version control on GitHub. 
### `pip install python-dotenv`

5. CORS - Cross Origin Resource Sharing Middleware for Flask. Allows communication between different origins.
### `pip install flask-cors`

6. Requests - For making HTTP requests to other APIs.
### `pip install requests`
