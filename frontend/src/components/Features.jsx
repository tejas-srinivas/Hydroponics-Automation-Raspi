import React from 'react'
import { FaMedapps, FaLeaf, FaTint, FaBraille } from "react-icons/fa";

const Features = () => {
    return (
        <div className='features-wrapper'>
            <div className='features'>
                <FaMedapps size={50}  color="#5c2a03" />
                <h2 style={{color:'#00d411'}}>Light</h2>
                <p style={{ color: "gray" }}> Plants need five to six hours of light per day.</p>
            </div>
            <div className='features'>
                <FaLeaf size={50} color="#5c2a03" />
                <h2 style={{color:'#00d411'}}>Nutrients</h2>
                <p style={{ color: "gray" }}>Hydroponic plants are supported with porous materials, such as pebbles or gravel, which allow nutrients to enter the roots. Nutrients can come from a variety of sources.</p>
            </div>
            <div className='features'>
                <FaTint size={50} color="#5c2a03" />
                <h2 style={{color:'#00d411'}}>Water</h2>
                <p style={{ color: "gray" }}>Hydroponic systems use less water than traditional soil-based farming. The water can be recovered and recycled.</p>
            </div>
            <div className='features'>
                <FaBraille size={50} color="#5c2a03" />
                <h2 style={{color:'#00d411'}}>Space</h2>
                <p style={{ color: "gray" }}>Hydroponics requires very little space for growing.</p>
            </div>
        </div>
    )
}

export default Features
