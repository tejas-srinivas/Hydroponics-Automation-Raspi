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
                        <img src={Dashboard} width={30} height={30} style={{color:"f2f2f2"}} alt="dashboard" />
                        <Link to="/dashboard">dashboard</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/phAnalysis"
                                ? "active"
                                : ""
                        }
                    >
                        <img src={Performance} width={30} height={30} style={{color:"f2f2f2"}} alt="ph analysis" />
                        <Link to="/phAnalysis">pH Analysis</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/ecAnalysis" ? "active" : ""
                        }
                    >
                        <img src={Performance} width={30} height={30} style={{color:"f2f2f2"}} alt="ec analysis" />
                        <Link to="/ecAnalysis">EC Analysis</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/tempAnalysis" ? "active" : ""
                        }
                    >
                        <img src={Temperature} width={30} height={30} style={{color:"f2f2f2"}} alt="temperature" />
                        <Link to="/tempAnalysis">Temperature</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/summary" ? "active" : ""
                        }
                    >
                        <img src={Settings} width={30} height={30} style={{color:"f2f2f2"}} alt="summary" />
                        <Link to="/summary">summary</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/logs" ? "active" : ""
                        }
                    >
                        <img src={Logs} alt="Logs" width={30} height={30} style={{color:"f2f2f2"}}/>
                        <Link to="/logs">Logs</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/myaccount" ? "active" : ""
                        }
                    >
                        <img src={Support} alt="Support" />
                        <Link to="/myaccount">my account</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/about" ? "active" : ""
                        }
                    >
                        <img src={About} width={30} height={30} style={{color:"f2f2f2"}} alt="Support" />
                        <Link to="/about">about</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/liveStream" ? "active" : ""
                        }
                    >
                        <img src={About} width={30} height={30} style={{color:"f2f2f2"}} alt="Support" />
                        <Link to="/liveStream">live stream</Link>
                    </li>
                </ul>

                <img src={SidebarBack} alt="icon" className={closeMenu === false ? "sidebar-background" : "close-background"}/>
            </div>
        </div>
    );
};

export default Sidebar;
