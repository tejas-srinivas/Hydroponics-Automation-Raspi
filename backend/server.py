from flask import Flask, render_template, session
from flask_pymongo import PyMongo
from bson.json_util import dumps
from flask import request
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
app.secret_key = "IOTPROJECT"
CORS(app)
mongo = PyMongo(app, uri = "mongodb+srv://rootUser:root@smarthydro.zpntnvu.mongodb.net/hydroponic_data")

#inserts new record to database
@app.route('/registration',methods=['GET','POST'])
def add_user():
    message = ''
    if "email" in session:
        message = "Login in the user"
        return message
    if request.method == 'POST':
        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        confirmPassword = request.form.get("confirmPassword")
        role = request.form.get("role")

        user_found = mongo.db.users.find_one({"name" : name})
        email_found = mongo.db.users.find_one({"email" : email})

        if user_found:
            message = "There is already an user with this name"
            return message
        
        if email_found:
            message = "There is already an user with this email"
            return message
        
        if password != confirmPassword:
            message = "Passwords did not match"
            return message
        
        else:
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()) 
            #assing them in a dictionary in key value pairs
            user_input = {'name': name, 'email': email, 'password': hashed, 'role': role}
            #insert it in the record collection
            mongo.db.users.insert_one(user_input)
            
            #find the new created account and its email
            user_data = mongo.db.users.find_one({"email": email})
            resp = dumps(user_data)
            return resp

    message = "Registration Failed"
    return message

#Logout from session
@app.route("/logout", methods=["POST", "GET"])
def logout():
    if "email" in session:
        session.pop("email", None)
        return "Logout successful"
    else:
        return "Error Occured"

#api used to login to the database
@app.route("/login", methods=["POST", "GET"])
def login():
    message = 'Please login to your account'
    if "email" in session:
        return "User has already logged in"

    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        #check if email exists in database
        email_found = mongo.db.users.find_one({"email": email})
        if email_found:
            email_val = email_found['email']
            name_val = email_found['name']
            passwordcheck = email_found['password']
            #encode the password and check if it matches
            if bcrypt.checkpw(password.encode('utf-8'), passwordcheck):
                session["email"] = email_val
                message = "Login Succesful go to dashboard"
                return [email_val,name_val]
            else:
                if "email" in session:
                    return "Invalid Password"
                message = 'Wrong password'
                return message
        else:
            message = 'Email not found'
            return message
    return "Invalid username or password"

# gets only current data
@app.route('/real_time')
def get_real_time_data():
    realTime = mongo.db.real_time_data.find()
    resp = dumps(realTime)
    return resp

#gets only 15 data in descending order of time stamp
@app.route('/sensor_data')
def get_all_sensor_data():
    sensorData = mongo.db.sensor_data.find().sort({"_id":-1}).limit(15)
    resp = dumps(sensorData)
    return resp

#gets all data
@app.route('/summary_report')
def get_summary_report():
    summary = mongo.db.sensor_data.find()
    resp = dumps(summary)
    return resp

#gets only ph data
@app.route('/ph_report')
def get_ph_report():
    summary = mongo.db.sensor_data.find({},{
        "ph":1,
        "timestamp":1
    })
    resp = dumps(summary)
    return resp

#gets only ec data
@app.route('/ec_report')
def get_ec_report():
    summary = mongo.db.sensor_data.find({},{
        "ec":1,
        "timestamp":1
    })
    resp = dumps(summary)
    return resp

#gets only temperature data
@app.route('/temp_report')
def get_temp_report():
    summary = mongo.db.sensor_data.find({},{
        "temperature":1,
        "timestamp":1
    })
    resp = dumps(summary)
    return resp

if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 5001, debug=True)