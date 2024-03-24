import React, { useState } from "react";
import Icon from "../Images/Logo.png";
import Small_Icon from "../Images/Small_Logo.png"
import Profile from "../Images/avatar.jpg";
import Dashboard from "../Images/dashboard.svg";
import SidebarBack from "../Images/sidebar-background.jpeg"
import Performance from "../Images/performance.svg";
import Temperature from "../Images/temperature.svg";
import Settings from "../Images/summary.svg";
import Logs from "../Images/logs1.svg";
import Support from "../Images/support.svg";
import About from '../Images/about.svg'
import Live from '../Images/live.svg'
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({name}) => {
    const location = useLocation();
    // const name = "Ghost"

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            
            <div
                className={
                    closeMenu === false
                        ? "logoContainer"
                        : "logoContainer active"
                }
            >
                <img src={closeMenu === false ? Icon : Small_Icon} alt="icon" className="logo"/>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "burgerContainer"
                        : "burgerContainer active"
                }
            >
                <div
                    className="burgerTrigger"
                    onClick={() => {
                        handleCloseMenu();
                    }}
                ></div>
                <div className="burgerMenu"></div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "profileContainer"
                        : "profileContainer active"
                }
            >
                <img src={Profile} alt="profile" className="profile" />
                <div className="profileContents">
                    <p className="name">Hello, {name}</p>
                    <p>Admin</p>
                </div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li className={location.pathname === "/dashboard" ? "active" : ""}>
                    <Link to="/dashboard">
                        <img src={Dashboard} width={30} height={30} style={{color:"f2f2f2"}} alt="dashboard" />
                        dashboard</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/phAnalysis"
                                ? "active"
                                : ""
                        }
                    >
                        <Link to="/phAnalysis">
                        <img src={Performance} width={30} height={30} style={{color:"f2f2f2"}} alt="ph analysis" />
                        pH Analysis</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/ecAnalysis" ? "active" : ""
                        }
                    >
                        <Link to="/ecAnalysis">
                        <img src={Performance} width={30} height={30} style={{color:"f2f2f2"}} alt="ec analysis" />
                        EC Analysis</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/tempAnalysis" ? "active" : ""
                        }
                    >
                        <Link to="/tempAnalysis">
                        <img src={Temperature} width={30} height={30} style={{color:"f2f2f2"}} alt="temperature" />
                        Temperature</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/summary" ? "active" : ""
                        }
                    >
                        <Link to="/summary">
                        <img src={Settings} width={30} height={30} style={{color:"f2f2f2"}} alt="summary" />
                        summary</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/logs" ? "active" : ""
                        }
                    >
                        <Link to="/logs">
                        <img src={Logs} alt="Logs" width={30} height={30} style={{color:"f2f2f2"}}/>
                        Logs</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/myaccount" ? "active" : ""
                        }
                    >
                        <Link to="/myaccount">
                        <img src={Support} alt="Support" />
                        my account</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/about" ? "active" : ""
                        }
                    >
                        <Link to="/about">
                        <img src={About} width={30} height={30} style={{color:"f2f2f2"}} alt="Support" />
                        about</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/liveStream" ? "active" : ""
                        }
                    >
                        <Link to="/liveStream">
                        <img src={Live} width={30} height={30} style={{color:"f2f2f2"}} alt="Support" />
                        live stream</Link>
                    </li>
                </ul>

                <img src={SidebarBack} alt="icon" className={closeMenu === false ? "sidebar-background" : "close-background"}/>
            </div>
        </div>
    );
};

export default Sidebar;
