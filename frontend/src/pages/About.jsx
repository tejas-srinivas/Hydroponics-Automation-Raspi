import React from 'react'
import Sidebar from "../components/Sidebar"
import Signout from "../components/Signout";
import College from "../Images/sjbit-logo.webp"
import Principal from "../Images/principal.webp"
import Hod from "../Images/shahi.jpeg"
import Bhakt from "../Images/bhatkat.jpeg"
import Ise from "../Images/ise.png"
import Dean from "../Images/dean.png"
import RD from "../Images/R&D.png"
import PI from "../Images/Prinicipal_Investigator.png"
import ugStudents from '../components/UgStudents';
import Student from '../components/Student';

const About = ({ name }) => {

  document.title = "About"
  return (
    <>
      <Sidebar name={name} />
      <section className='home-section' style={{ textTransform: "initial" }}>
        <nav>
          <div className="sidebar-button">
            <span className="dashboard">About</span>
            <Signout name={name} />
          </div>
        </nav>
        <div className="home-content" style={{ paddingLeft: "15%", textAlign: "justify", width: "70%", display: "flex", alignItems: "center", justifyContent:"space-evenly", gap:"10%" }}>
          <img src={College} alt="" width={150} height={150} />
          <div className='wrapper'>
            {/* <p style={{textAlign:"center"}}>|| JAI SRI GURUDEV ||</p> */}
            <h2 style={{ textAlign: "center" }}>SJB Institute of Technology</h2>
            <span>SJB Institute of Technology (SJBIT) was established in the year 2001 by Sri Adichunchanagiri Shikshana Trust® (SAST®) under the guidance of His Holiness Jagadguru Padma Bhushana Dr. Sri Sri Sri Balagangadharanatha Maha Swamiji. To know more  <a target="_blank" href="https://sjbit.edu.in/about-sjb-institute-of-technology/" rel="noreferrer">Click here</a></span>
          </div>
        </div>
        <div className="home-content" style={{ paddingLeft: "15%", textAlign: "center", width: "70%", display: "flex", alignItems: "center",gap:"25%" }}>
          <img src={Principal} alt="" width={150} height={150} style={{ borderRadius: "50%" }} />
          <div className='wrapper'>
            <h2 style={{textAlign:"center"}}>Principal, SJBIT</h2>
            <span>Dr. K. V. Mahendra Prashanth, to know more </span>
            <a target="_blank" href="https://sjbit.edu.in/principal/" rel="noreferrer">Click here</a>
          </div>
        </div>
        <div className="home-content" style={{ paddingLeft: "15%", textAlign: "center", width: "70%", display: "flex", alignItems: "center", gap: "20%" }}>
          <img src={Dean} alt="" width={150} height={150} style={{ borderRadius: "50%" }} />
          <div className='wrapper'>
            <h2>Advisor, SJBIT</h2>
            <span>Prof. C. V. Yelamaggad, to know more </span>
            <a target="_blank" href="https://drive.google.com/file/d/17DY0_O4gRSs3UcKi0RKg8IHZDCEG2yAj/view?usp=drive_link" rel="noreferrer">Click here</a>
          </div>
        </div>
        <div className="home-content" style={{ paddingLeft: "15%", textAlign: "center", width: "70%", display: "flex", alignItems: "center", gap: "20%" }}>
          <img src={Bhakt} alt="" width={150} height={150} style={{ borderRadius: "50%" }} />
          <div className='wrapper'>
            <h2>Chief R&D Coordinator, SJBIT</h2>
            <span>Mr. Bhaktavatsala S, to know more </span>
            <a target="_blank" href="https://drive.google.com/file/d/1fuCsHnO9dD44MAZ1h6t6PV-d0H-CXZ1v/view?usp=drive_link" rel="noreferrer">Click here</a>
          </div>
        </div>
        <div className="home-content" style={{ paddingLeft: "15%", textAlign: "justify", width: "70%", display: "flex", alignItems: "center", gap: "10%" }}>
          <img src={Ise} alt="" width={150} height={150} style={{ borderRadius: "50%" }} />
          <div className='wrapper'>
            <h2>Dept. of Information Science & Engineering, SJBIT</h2>
            <span>The Information Science and Engineering program is an interdisciplinary field combining computer science, IT and related disciplines. It provides students with a comprehensive understanding of data collection, management, and analysis in various forms. The curriculum covers data structures, algorithms, databases, computer networks, software engineering, information security, and human-computer interaction. To know more <a target="_blank" href="https://sjbit.edu.in/bachelor-of-engineering-in-information-science-and-engineering/" rel="noreferrer">Click here</a></span>
          </div>
        </div>
        <div className="home-content" style={{ paddingLeft: "15%", textAlign: "center", width: "70%", display: "flex", alignItems: "center", gap: "25%" }}>
          <img src={Hod} alt="" width={150} height={150} style={{ borderRadius: "50%" }} />
          <div className='wrapper'>
            <h2 style={{ textAlign: "center" }}>Head of Department ISE, SJBIT</h2>
            <span>Dr. Shashidhara H R, to know more</span>
            <a target="_blank" href="https://drive.google.com/file/d/1hWiCfqWa-SjDqfsl5BVfEm0o14RMwKwO/view?usp=sharing" rel="noreferrer">Click here</a>
          </div>
        </div>
        <div className="home-content" style={{ paddingLeft: "15%", textAlign: "center", width: "70%", display: "flex", alignItems: "center", gap: "25%" }}>
          <img src={RD} alt="" width={150} height={150} style={{ borderRadius: "50%" }} />
          <div className='wrapper'>
            <h2 style={{ textAlign: "center" }}>Research Coordinator, Dept. of ISE, SJBIT</h2>
            <span>Dr. Abhilash C N, Professor, to know more</span>
            <a target="_blank" href="https://drive.google.com/file/d/1-bgvm_WSqOmk_jcg6QtOooaTk8WFFpxo/view?usp=drive_link" rel="noreferrer">Click here</a>
          </div>
        </div>
        <div className="home-content" style={{ paddingLeft: "15%", textAlign: "center", width: "70%", display: "flex", alignItems: "center", gap: "15%" }}>
          <img src={PI} alt="" width={180} height={150} style={{ borderRadius: "50%" }} />
          <div className='wrapper'>
            <h2 style={{ textAlign: "center" }}>Principal Investigator, Dept. of ISE, SJBIT</h2>
            <span>Dr. Pavitra Bai S, Professor, Project Prinicipal Investigator</span>
            <span>Project Title: Smart Nutrition Management System for Hydroponic Farming</span>
            <span>Scheme: VGST Grant RGS-F/GRD No. 1081</span>
            <a target="_blank" href="https://drive.google.com/file/d/1sBVUuXOSc-aNvSPDyHzgdxUyxC-bK_u2/view?usp=drive_link" rel="noreferrer">Click here</a>
          </div>
        </div>
        <div className="home-content" style={{ paddingLeft: "18%", textAlign: "center", width: "80%", display: "flex", alignItems: "center", gap: "25%" }}>
          <div className='wrapper'>
            <h2 style={{ textAlign: "center", paddingLeft: "15%" }}>UG Students, Dept. of ISE, SJBIT [Developers]</h2>
            <div className='student--wrapper'>
              {ugStudents.map((student) => (
                <Student key={student.id} student={student} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
