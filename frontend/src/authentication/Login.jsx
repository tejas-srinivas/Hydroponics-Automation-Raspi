import React, { useState } from "react";
import validator from 'validator'
import Image from './background4.jpg'
import Logo from './LogoT.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./auth";

function Login() {
  const baseURL = "https://smarthydro-auth-api.onrender.com"

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {emailState, setEmailState} = useAuth()

  const [passwordErrorMessege, setPasswordErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false)

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (password.length < 8) {
      setPasswordErrorMessage(true);
    } else {
      setPasswordErrorMessage(false);
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    var email = e.target.value
    if (validator.isEmail(email)) {
      setEmailErrorMessage(false)
    }
    else if (email === '') {
      setEmailErrorMessage(true)
    }
    else
      setEmailErrorMessage(true)
  }

  const clearForm = () => {
    setEmail("")
    setPassword("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      password: password
    };
    if (!passwordErrorMessege && !emailErrorMessage) {
      // console.log(password)
      const user = localStorage.getItem('email')
      if (user) {
        navigate("/dashboard")
      } else {
        await axios.post(`${baseURL}/login`, userData)
          .then((res) => {
            // console.log(res.data.email)
            setEmailState(res.data.email)
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('name', res.data.name)
            alert("Login Successful!!")
            navigate("/dashboard")
          }).catch((error) => {
            alert("Error Connecting to Backend")
            console.log(error.message)
          })
      }
    }else{
      alert("Please fill out all fields correctly.")
      clearForm()
    }

  }

  return (
    <>
      <img className="image-authentication" src={Image} alt="" />
      <div className="wrapper-authentication" style={{ transform: "translate(95%,-135%)" }}>
        <form onSubmit={handleSubmit} method="POST">
          <div className="wrapper-heading">
            <h2>Login</h2>
            <img src={Logo} alt="logo" width="150px" />
          </div>
          <div className="input-box">
            {/* <label className="required">Email Address:</label> */}
            <input
              className="field__input"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={handleEmail}
            />
            {emailErrorMessage && <p style={{ color: "red", fontSize: "8px" }}>Enter valid email</p>}
          </div>
          <div className="input-box">
            {/* <label class="required">Password:</label> */}
            <input
              className="field__input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
            {passwordErrorMessege && <p style={{ color: "red", fontSize: "8px" }}>Password should have atleast 8 characters</p>}
          </div>
          <div class="input-box button">
            <input type="Submit" value="Login Now"></input>
          </div>
          <div class="text">
            <h3>Don't have an account? <a href="/signup">Signup</a></h3>
            <h3><a href="/">Go Home</a></h3>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
