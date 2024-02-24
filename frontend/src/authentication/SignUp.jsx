import React, { useState } from "react";
import validator from 'validator'
import Image from './background4.jpg'
import Logo from './LogoT.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function SignUp({ baseURL }) {

  const navigate = useNavigate()
  const [first, setFirst] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("role")
  const [loading, setLoading] = useState(false)
  const [passwordErrorMessege, setPasswordErrorMessage] = useState(false);
  const [confirmPasswordErrorMessege, setConfirmPasswordErrorMessage] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false)

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (password.length < 8) {
      setPasswordErrorMessage(true);
    } else {
      setPasswordErrorMessage(false);
    }
    // console.log(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value) {
      setConfirmPasswordErrorMessage(false);
    } else {
      setConfirmPasswordErrorMessage(true);
    }
  }

  const handleFirstName = (e) => {
    setFirst(e.target.value);
    if (first === ''){
      setFirstNameErrorMessage(true);
    }
    else
      setFirstNameErrorMessage(false);
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
    setFirst("")
    setConfirmPassword("")
    setPassword("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const userData = {
      name: first,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: role
    };
    if ((!firstNameErrorMessage && !passwordErrorMessege && !emailErrorMessage && !confirmPasswordErrorMessege && role !== "role")){
      await axios.post(`${baseURL}/registration`,userData)
      .then((response)=>{
        console.log('Successful Registration', response)
        alert("Account Created !!")
        navigate("/login")
      })
      .catch((error)=>{console.log(error)});
      
    }else{
      alert("Fill the details properly....")
      clearForm()
    }
  }

  if(loading){
    return <Loading />
  }

  return (
    <>
      <img className="image-authentication" style={{height:"100vh", width:"100vw"}} src={Image} alt="" />
      <div className="wrapper-authentication signup">
        <form onSubmit={handleSubmit} method="POST">
          <div className="wrapper-heading">
            <h2>Sign Up</h2>
            <img src={Logo} alt="logo" width="150px"/>
          </div>
            <div className="input-box">
              {/* <label className="required">First Name:</label> */}
              <input
                className="field__input"
                type="text"
                placeholder="Enter Name"
                value={first}
                name="name"
                onChange={handleFirstName}
                required
              />
              {firstNameErrorMessage && <p style={{ color: "red", fontSize: "11px", marginTop:"1px" }}>Name cannot be empty</p>}
            </div>
            <div className="input-box">
              {/* <label className="required">Email Address:</label> */}
              <input
                className="field__input"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={handleEmail}
                required
              />
              {emailErrorMessage && <p style={{ color: "red", fontSize: "11px", marginTop:"1px"}}>Enter valid email</p>}
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
                required
              />
              {passwordErrorMessege && <p style={{ color: "red", fontSize: "11px",marginTop:"1px" }}>Password must be 8 characters long</p>}
            </div>
            <div className="input-box">
              {/* <label class="required">Password:</label> */}
              <input
                className="field__input"
                type="password"
                placeholder="Re-Enter Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                required
              />
              {confirmPasswordErrorMessege && <p style={{ color: "red", fontSize: "11px",marginTop:"1px" }}>Passwords did not match</p>}
            </div>
            <div className="field">
              <label class="required">Role:</label>
              <br />
              <select name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="role">Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div class="input-box button">
              <input type="Submit" value="Register Now" ></input>
            </div>
            <div class="text">
              <h3>Already have an account? <a href="/login">Login now</a></h3>
              {/* <br /> */}
              <h3><a href="/">Go Home</a></h3>
            </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
