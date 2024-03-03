import React, { useState } from 'react'
import Sidebar from "../components/Sidebar";
import Signout from '../components/Signout';
import Profile from "../Images/avatar.jpg";
import axios from 'axios';

const Myaccount = ({ name, baseURL }) => {

  const [namee, setName] = useState(localStorage.getItem('name'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isFormDisabled, setIsFormDisabled] = useState(true)
  const [isEditButtonDisabled, setEditButtonDisabled] = useState(false)
  const [data, setData] = useState([])

  const handleEdit = () => {
    setIsFormDisabled(false)
    setEditButtonDisabled(true)
  }

  const handleSubmit = async () => {
    if (password === repassword && password !== "" && namee.length > 0 && password.length > 8) {
      localStorage.setItem('name', namee);
      localStorage.setItem('email', email);
      const user_input = {"name": namee, "email": email, "password": password, "repassword": repassword};
      await axios.put(`${baseURL}/updateDetails`, user_input)
      .then((res) => {
        setData(res.data)
        setName(data.name)
        setEmail(data.email)
        setPassword("")
        setRepassword("")
        alert("Profile Updated Successfully")
        setIsFormDisabled(true)
        setEditButtonDisabled(false)
      }).catch((error) => console.log(error))
    }else {
      alert("Name should not be empty & password should have at least 8 characters")
    }
  }

  document.title = "My Account"
  // const name = "Ghost"
  return (
    <div>
      <Sidebar name={name} />
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <span className="dashboard">My Account</span>
            <Signout name={name} />
          </div>
        </nav>
        <div className='home-content'>
          <h2 style={{ margin: "15px 15px 15px 55px" }}>Personal Details</h2>
          <h3 style={{ marginLeft: "65%" }}>Edit Details</h3>
          <div className='per-details' style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <img src={Profile} alt="profile" className="profile" style={{ mixBlendMode: "multiply" }} width={300} height={300} />
            <form className='form-wrapper' method='post'>
              <div className='form-values'>
                <label for="fname">Name :</label><br />
                <div className='input-wrapper'>
                  <input type="text" value={namee} onChange={(event) => setName(event.target.value)} disabled={isFormDisabled} /><br />
                </div>
              </div>

              <div className='form-values'>
                <label for="fname">Email :</label><br />
                <div className='input-wrapper'>
                  <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} disabled={isFormDisabled} /><br />
                </div>
              </div>

              <div className='form-values'>
                <label for="fname">Password :</label><br />
                <div className='input-wrapper'>
                  <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={isFormDisabled} /><br />
                </div>
              </div>

              <div className='form-values'>
                <label for="fname">Re-enter Password :</label><br />
                <div className='input-wrapper'>
                  <input type="password" value={repassword} onChange={(event) => setRepassword(event.target.value)} disabled={isFormDisabled} /><br />
                </div>
              </div>
            </form>
          </div>
          <button style={{ marginLeft: "60%", fontFamily: "Poppins", fontSize: "18px", color: "#f5f5f5", backgroundColor: isEditButtonDisabled ? "gray" : "#00d411", padding: "15px 35px 15px 35px", borderRadius: "12px", boxShadow: "0 2px 15px rgba(80,64,80,.4)", border: "none" }} onClick={handleEdit} disabled={isEditButtonDisabled}>Edit</button>
          <button style={{ transform: "translate(10%,0%)", fontFamily: "Poppins", fontSize: "18px", color: "#f5f5f5", backgroundColor: isEditButtonDisabled ? "#00d411" : "gray", padding: "15px 35px 15px 35px", borderRadius: "12px", boxShadow: "0 2px 15px rgba(80,64,80,.4)", border: "none" }} onClick={handleSubmit}>Save</button>
        </div>
      </section >
    </div>
  )
}

export default Myaccount
