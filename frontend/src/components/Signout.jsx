import React from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from "../Images/avatar.jpg";

const Signout = ({name}) => {
    const navigate = useNavigate()
    return (
        <div className='wrap' style={{ display: "flex", alignItems: "center", justifyContent: "space-between",gap: "2rem"}}>
            <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.3rem" }}>
                <img src={Profile} alt="profile" width={"40px"} style={{}} />
                <p style={{ fontSize: '20px' }}>{name}</p>
            </div>
            <button className="sign-out" style={{}}><a href="/" style={{ textDecoration: "none", color: "#f2f2f2" }} onClick={navigate("/")}>Sign Out</a></button>
        </div>
    )
}

export default Signout
