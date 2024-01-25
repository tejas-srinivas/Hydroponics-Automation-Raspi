import React from 'react'
import Sidebar from "../components/Sidebar";
import Signout from '../components/Signout';

const Myaccount = ({name}) => {
  // const name = "Ghost"
  return (
    <div>
      <Sidebar name={name}/>
      <section class="home-section">
        <nav>
          <div class="sidebar-button">
            <span class="dashboard">My Account</span>
              <Signout name={name}/>
          </div>
        </nav>
      </section >
    </div>
  )
}

export default Myaccount
