import React from 'react'
import { FaMedapps, FaLeaf, FaTint, FaBraille } from "react-icons/fa";

const Features = () => {
    return (
        <div className='features-wrapper'>
            <div className='features'>
                <FaMedapps size={50}  color="#5c2a03" />
                <h2 style={{color:'#00d411'}}>Light</h2>
                <p style={{ color: "gray" }}> Hydroponics optimizes light usage by positioning plants strategically, ensuring they receive adequate light without competition from neighboring vegetation. This controlled environment allows for precise adjustment of light intensity.</p>
            </div>
            <div className='features'>
                <FaLeaf size={50} color="#5c2a03" />
                <h2 style={{color:'#00d411'}}>Nutrients</h2>
                <p style={{ color: "gray" }}>Hydroponics delivers precise nutrition to plants, ensuring optimal growth and health. By directly supplying nutrients to plant roots in a controlled environment. This results in healthier plants with higher nutrient uptake, leading to superior crop quality.</p>
            </div>
            <div className='features'>
                <FaTint size={50} color="#5c2a03" />
                <h2 style={{color:'#00d411'}}>Water</h2>
                <p style={{ color: "gray" }}>Hydroponics conserves water by recycling nutrient solutions, drastically reducing water usage compared to traditional soil farming. The closed-loop system minimizes water loss and ensures plants receive the exact amount of water they need.</p>
            </div>
            <div className='features'>
                <FaBraille size={50} color="#5c2a03" />
                <h2 style={{color:'#00d411'}}>Space</h2>
                <p style={{ color: "gray" }}>Hydroponics requires very little space for growing. Hydroponics systems can be tailored to fit into small spaces such as small rooms, rooftops. Deep Flow Technique can be easily configured for smaller arrangements.</p>
            </div>
        </div>
    )
}

export default Features
