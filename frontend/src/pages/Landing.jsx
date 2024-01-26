import React, { useState } from 'react'
import LandingPage from '../Images/LandingPage.jpg'
import LandingLogo from '../Images/LandingLogo.png'

const Landing = () => {

  const [color,setColor] = useState(false)

  const handleScroll = () => {
    if (window.scrollY >= 80){
      setColor(true);
    }else
      setColor(false)
  }

  window.addEventListener('scroll',handleScroll)
  return (
    <div className="wrapper-landing">
      <div className='nav-wrapper'>
        <nav className={color ? "landing-nav bg":"landing-nav"} >
          <img src={LandingLogo} className='landing-logo' alt="landing-logo" />
          <div className="nav-contents">
            <ul className='nav-menu'>
              <li className='nav-item'><a href="#home" className='nav-link'>Home</a></li>
              <li className='nav-item'><a href="#about" className='nav-link'>About</a></li>
              <li className='nav-item'><a href="#features" className='nav-link'>Features</a></li>
              <li className='nav-item'><a href="/login" className='nav-link'>Login</a></li>
              <li className="nav-item"><a href="/signup" className='nav-link' style={{color:"#f5f5f5",backgroundColor:"#00d411",padding:"5px 30px 5px 30px",borderRadius:"12px",boxShadow:"0 2px 15px rgba(80,64,80,.9)"}}>Sign Up</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className='filter' id="home">
        <img src={LandingPage} className='landing-image' alt="background" />
      </div>
        <div classname="landing-description" style={{position:"absolute",transform:"translate(15%,-220%)",color:"#fff"}}>
          <span style={{fontSize:"45px",fontWeight:"800"}}>Modern Agriculture</span>
          <p style={{width:"445px",textTransform:"none"}} className='description'>Creating a web application that is useful helps farmers, especially to improve the quality of agriculture as well as accelerate the process of agriculture.A method conserves water and space, offering a sustainable solution for urban agriculture.</p>
        </div>
        <div className="about-section" id="about">
          <h1>What is Hydroponics ?</h1>
        </div>
    </div>
  )
}

export default Landing
