import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios if you prefer Axios over fetch
import Sidebar from "../components/Sidebar";
import Signout from '../components/Signout';

function LiveStream({name}) {
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    const fetchVideoStream = async () => {
      try {
        const response = await fetch('https://smarthydro-auth-api.onrender.com/get_processed_image');
        // Use Axios instead:
        // const response = await axios.get('https://smarthydro-auth-api.onrender.com/get_processed_image');
        if(!response.ok){
          throw new Error('Failed to fetch processed image')
        }
        const blob = await response.blob()
        setVideoStream(URL.createObjectURL(blob)) // Corrected function name
      } catch (error) {
        console.error('Error fetching video stream:', error);
      }
    };

    const interval = setInterval(fetchVideoStream, 1000); // Adjust interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <Sidebar name={name} />
        <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <span className="dashboard">Live Stream</span>
            <Signout name={name}/>
          </div>
        </nav>
            {videoStream && <img src={videoStream} alt="Live Video Stream" width='1280' height='720'/>}
        </section>
    </>
  );
}

export default LiveStream;
