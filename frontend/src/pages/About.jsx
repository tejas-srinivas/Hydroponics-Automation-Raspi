import React from 'react'
import Sidebar from "../components/Sidebar"

const About = ({name}) => {
  return (
    <>
      <Sidebar name={name} />
      <h1>About Developers</h1>
    </>
  )
}

export default About
