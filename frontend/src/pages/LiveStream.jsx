import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import Signout from '../components/Signout';

function LiveStream({name, baseURL}) {
  const [videoStream, setVideoStream] = useState(null);
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchVideoStream = async () => {
      try {
        const response = await fetch(`${baseURL}/get_processed_image`);
        !response.ok ? setError(true) : setError(false)
        const blob = await response.blob()
        setVideoStream(URL.createObjectURL(blob)) 
      } catch (error) {
        console.error('Error fetching video stream:', error);
        setError(true)
      }
    };

    const interval = setInterval(fetchVideoStream, 1000);

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
            {error && <h1>Error Fetching Live Data, Check if the livestream.py program is running</h1>}
            {videoStream && <center><img className='live_video' src={videoStream} alt="Live Video Stream" width='1080' height='620'/></center>}
        </section>
    </>
  );
}

export default LiveStream;
