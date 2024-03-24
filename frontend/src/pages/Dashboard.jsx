import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import BoxImage from "../Images/box-image.png"
import BoxImage2 from "../Images/box-image2.png"
import BoxImage3 from "../Images/box-image3.png"
import BoxImage5 from "../Images/box-image5.png"
import BoxImage6 from "../Images/box-image6.png"
import GaugeChart from "../components/GaugeChart";
import HumidtyGauge from "../components/HumidtyGauge";
import Sidebar from "../components/Sidebar"
import axios from 'axios';
import DashChart from "../components/DashChart";
import Signout from "../components/Signout";
import moment from 'moment/moment';
import { Link } from "react-router-dom";

const Dashboard = ({ name, title, baseURL }) => {
    // window.location.reload()
    const [data, setData] = useState({
        temperature: "",
        humidity: "",
        pH: "",
        ec: "",
        lux:""
    })
    console.log(baseURL)
    document.title = title
    // const url = String(baseURL)
    // const name = "Ghost"

    const sensor_data = async () => {

        try {
            await axios.get(`${baseURL}/real_time`)
                .then(response => {
                    // conscole.log(response)
                    setData(response.data[0])
                }).catch((error) => {
                    console.log(error)
                })
            // console.log(response.data[0])
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        sensor_data()
        const intervalId = setInterval(sensor_data, 100000);
        return () => clearInterval(intervalId);
    }, [])


    return (
        <>
            <Sidebar name={name} />
            <section className="home-section">
                <nav>
                    <div className="sidebar-button">
                        <span className="dashboard">Dashboard</span>
                        <code style={{ position: "absolute", margin: "auto", marginLeft: "42%", textAlign: "center", fontWeight: "500", fontSize: "18px" }}>Last Run: {moment(data.timestamp).format('lll')}</code>
                        <Signout name={name} />
                    </div>
                </nav>
                <div className="home-content">
                    <div className="overview-boxes">
                        <div className="box">
                            <div className="right-side">
                                <Icon icon="mingcute:light-line" color="#25523d" />&nbsp;
                                <span>Light Level</span>
                                <br></br>
                                <span className="data" style={{ "color": data.lux > 28 ? "green" : "red" }}>{data.lux} Lux {data.lux > 5000 ? "▲" : "▼"}</span>
                            </div>
                            <img src={BoxImage} alt="box-image1" className="box-image" />
                            {/* <i class="bx bxs-thermometer readings"></i> */}
                        </div>
                        <Link to='/tempAnalysis' style={{textDecoration:"none"}} className="box">
                            <div className="right-side">
                                <i className="bx bxs-thermometer readings"></i>
                                <span>Temperature</span>
                                <br></br>
                                <span className="data" style={{ "color": data.temperature > 28 ? "red" : "green" }}>{data.temperature} ºC {data.temperature > 28 ? "▲" : "▼"}</span>
                            </div>
                            <img src={BoxImage5} alt="box-image1" className="box-image" />
                            {/* <i class="bx bxs-thermometer readings"></i> */}
                        </Link>
                        <div className="box">
                            <div className="right-side">
                                <i className="bx bxs-droplet-half readings two"></i>&nbsp;
                                <span>Humidity</span>
                                <br></br>
                                <span className="data" id="humidity" style={{ "color": data.humidity > 60 ? "red" : "green" }}>{data.humidity} % {data.humidity > 60 ? "▲" : "▼"}</span>
                            </div>
                            {/* <i class="bx bxs-droplet-half readings two"></i> */}
                            <img src={BoxImage2} alt="box-image2" className="box-image" />
                        </div>
                        <Link to='/phAnalysis' style={{textDecoration:'none'}} className="box">
                            <div className="right-side">
                                <Icon icon="zondicons:thermometer" rotate={2} color="#25523d" />&nbsp;
                                <span>pH</span>
                                <br></br>
                                <span className="data" id="pressure" style={{ "color": data.ph > 6.5 ? "red" : "green" }}>{data.ph} H {data.ph > 6.5 ? "▲" : "▼"}</span>
                            </div>
                            {/* <i class="bx bxs-tachometer readings three"></i> */}
                            <img src={BoxImage3} alt="box-image3" className="box-image" />
                        </Link>
                        <Link to='/ecAnalysis' style={{textDecoration:'none'}} className="box">
                            <div className="right-side">
                                <Icon icon="icomoon-free:lab" color="#25523d" />&nbsp;
                                <span>EC</span>
                                <br></br>
                                <span className="data" id="altitude" style={{ "color": data.ec > 2.4 ? "red" : "green" }}>{data.ec} ms/cm {data.ec > 2.3 ? "▲" : "▼"}</span>
                            </div>
                            {/* <i class="bx bxs-building readings four"></i> */}
                            <img src={BoxImage6} alt="box-image4" className="box-image" />
                        </Link>
                    </div>
                    <div className="graph-box">
                        <div className="history-charts">
                            <div className="title">Ph, EC Monitoring:</div>
                            <DashChart baseURL={baseURL} />
                        </div>
                        <div className="gaugeCharts">
                            <div className="title">Temperature Monitoring:</div>
                            <div className="gauge-list">
                                <div className="gauge-box"><div id="humidity-gauge">Temperature: <GaugeChart temp={data.temperature} /></div></div>
                                <div className="gauge-box"><div id="humidity-gauge">Humidity: <HumidtyGauge humidity={data.humidity} /></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
