import React, { useState } from "react";
import validator from 'validator'
import Image from './background4.jpg'
import Logo from './LogoT.png'
import { useNavigate } from "react-router-dom";

function Login() {
  
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordErrorMessege, setPasswordErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false)
  // const [isValid, setIsValid] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!passwordErrorMessege && !emailErrorMessage){
      alert("Login Successful!!")
      // send data to the server and redirect to dashboard page
      // setIsValid(true)
      navigate("/dashboard")
    }else{
      alert("Invalid Email or Password")
      clearForm()
    }
  }

  return (
    <>
      <img className="image-authentication" src={Image} alt="" />
      <div className="wrapper-authentication" style={{transform:"translate(95%,-160%)"}}>
        <form onSubmit={handleSubmit}>
          <div className="wrapper-heading">
            <h2>Login</h2>
            <img src={Logo} alt="logo" width="150px"/>
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
              {emailErrorMessage && <p style={{ color: "red", fontSize: "8px"}}>Enter valid email</p>}
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
              <input type="Submit" value="Login Now" ></input>
            </div>
            <div class="text">
              <h3>Don't have an account? <a href="/signup">Signup</a></h3>
            </div>
        </form>
      </div>
    </>
  );
}

export default Login;
