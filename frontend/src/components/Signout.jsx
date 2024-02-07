import React from 'react'
import Profile from "../Images/avatar.jpg";
import axios from 'axios'
import useAuth from '../authentication/auth';
import Loading from './Loading';
import { useState } from 'react';

const Signout = ({name}) => {
    const baseURL = "https://smarthydro-auth-api.onrender.com"
    const {emailState, setEmailState} = useAuth()
    const  [loading, setLoading] = useState(false)
    // const navigate = useNavigate()
    const handleSignout = () => {
        setLoading(true)
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        setEmailState('')
        const resp = axios.get(`${baseURL}/logout`)
        window.location.href("/")
        console.log(resp.data)
    }

    if(loading)
        return  <Loading />
    // const navigate = useNavigate()
    return (
        <div className='wrap' style={{ display: "flex", alignItems: "center", justifyContent: "space-between",gap: "2rem"}}>
            <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.3rem" }}>
                <img src={Profile} alt="profile" width={"40px"} style={{}} />
                <p style={{ fontSize: '20px' }}>{name}</p>
            </div>
            <button className="sign-out" style={{}}><a href="/" style={{ textDecoration: "none", color: "#f2f2f2" }} onClick={handleSignout}>Sign Out</a></button>
        </div>
    )
}

export default Signout
