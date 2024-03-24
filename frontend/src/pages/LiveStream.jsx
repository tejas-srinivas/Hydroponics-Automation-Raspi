import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios if you prefer Axios over fetch
import Sidebar from "../components/Sidebar";
import Signout from '../components/Signout';

function LiveStream({name}) {
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    const fetchVideoStream = async () => {
      try {
        // const response = await fetch('https://smarthydro-auth-api.onrender.com/receive_video');
        // Use Axios instead:
        const response = await axios.post('https://smarthydro-auth-api.onrender.com/receive_video');
        
        const reader = response.body.getReader();
        const { value, done } = await reader.read();

        if (!done) {
          // Assuming the server sends JPEG frames
          const blob = new Blob([value], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          setVideoStream(imageUrl);
        }
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
            {videoStream && <img src={videoStream} alt="Live Video Stream" width='600' height='700'/>}
        </section>
    </>
  );
}

export default LiveStream;
