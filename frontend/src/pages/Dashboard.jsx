import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import BoxImage from "../Images/box-image.png"
import BoxImage2 from "../Images/box-image2.png"
import BoxImage3 from "../Images/box-image3.png"
import BoxImage4 from "../Images/box-image4.png"
import GaugeChart from "../components/GaugeChart";
import HumidtyGauge from "../components/HumidtyGauge";
import Sidebar from "../components/Sidebar"
import axios from 'axios';
import DashChart from "../components/DashChart";
import Signout from "../components/Signout";

const Dashboard = ({name, title}) => {
    // window.location.reload()
    const [data, setData] = useState({
        temperature: "",
        humidity: "",
        pH: "",
        ec: ""
    })

    document.title = title
    // const name = "Ghost"

    const random = async () => {

        const baseURL = "https://smarthydro-auth-api.onrender.com"
        try {
            await axios.get(`${baseURL}/real_time`)
                .then(response => {
                    // conscole.log(response)
                    setData(response.data[0])
                }).catch((error) => {
                    console.log(error)
                })
            // console.log(response.data[0])
            // setData(response.data[0])
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        random()
        const intervalId = setInterval(random, 10000);

        return () => clearInterval(intervalId);
    }, [])


    return (
        <>
            <Sidebar name={name}/>
            <section class="home-section">
                <nav>
                    <div class="sidebar-button">
                        <span class="dashboard">Dashboard</span>
                            <Signout name={name}/>
                    </div>
                </nav>
                <div class="home-content">
                    <div class="overview-boxes">
                        <div class="box">
                            <div class="right-side">
                            <i class="bx bxs-thermometer readings"></i>
                                <span>Temperature</span>
                                <br></br>
                                <span className="data" style={{ "color": data.temperature > 28 ? "red" : "green" }}>{data.temperature} ºC {data.temperature > 28 ? "▲" : "▼"}</span>
                            </div>
                            <img src={BoxImage} alt="box-image1" className="box-image" />
                            {/* <i class="bx bxs-thermometer readings"></i> */}
                        </div>
                        <div class="box">
                            <div class="right-side">
                        <i class="bx bxs-droplet-half readings two"></i>
                                <span>Humidity</span>
                                <br></br>
                                <span className="data" id="humidity" style={{ "color": data.humidity > 60 ? "red" : "green" }}>{data.humidity} % {data.humidity > 60 ? "▲" : "▼"}</span>
                            </div>
                            {/* <i class="bx bxs-droplet-half readings two"></i> */}
                            <img src={BoxImage2} alt="box-image2" className="box-image" />
                        </div>
                        <div class="box">
                            <div class="right-side">
                        <Icon icon="zondicons:thermometer"  rotate={2} color="#25523d" />
                                <span>pH</span>
                                <br></br>
                                <span className="data" id="pressure" style={{ "color": data.ph > 6.5 ? "red" : "green" }}>{data.ph} H {data.ph > 6.5 ? "▲" : "▼"}</span>
                            </div>
                            {/* <i class="bx bxs-tachometer readings three"></i> */}
                            <img src={BoxImage3} alt="box-image3" className="box-image" />
                        </div>
                        <div class="box">
                            <div class="right-side">
                        <Icon icon="icomoon-free:lab" color="#25523d" />
                                <span>EC</span>
                                <br></br>
                                <span className="data" id="altitude" style={{ "color": data.ec > 2.4 ? "red" : "green" }}>{data.ec} ms/cm {data.ec > 2.3 ? "▲" : "▼"}</span>
                            </div>
                            {/* <i class="bx bxs-building readings four"></i> */}
                            <img src={BoxImage4} alt="box-image4" className="box-image" />
                        </div>
                    </div>
                    <div class="graph-box">
                        <div class="history-charts">
                            <div class="title">Ph, EC Charts</div>
                            <DashChart />
                        </div>
                        <div class="gaugeCharts">
                            <div class="title">Gauge Charts</div>
                            <div class="gauge-list">
                                <div class="gauge-box"><div id="humidity-gauge">Temperature: <GaugeChart temp={data.temperature} /></div></div>
                                <div class="gauge-box"><div id="humidity-gauge">Humidity: <HumidtyGauge humidity={data.humidity} /></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
