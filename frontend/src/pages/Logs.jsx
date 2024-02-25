import React, { useState, useEffect } from 'react'
import Sidebar from "../components/Sidebar";
import Signout from '../components/Signout';
import axios from 'axios';
import moment from 'moment/moment';

const Logs = ({ name, baseURL }) => {

    document.title = "IoT Logs"
    const [logsData, setLogsData] = useState([])
    const [filtered, setFiltered] = useState([])
    const fetchLogsData = async () => {
        try {
            const response = await axios.get(`${baseURL}/logs_data`)
            // console.log(response.data)
            setLogsData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const getday = () => {
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const d = new Date();
        const day = weekday[d.getDay()];
        return day
    }

    const getmonth = () => {
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const d = new Date();
        const name = month[d.getMonth()];
        return name
    }

    const all = ""
    const day = getday()
    const month = getmonth()

    const filterData = (results, sub) => {
        const ans = results.filter(result => result.timestamp.includes(sub))
        setFiltered(ans)
    }

    // const ans = filterData(logsData, month);
    // console.log(ans)

    useEffect(() => {
        fetchLogsData()
        const intervalId = setInterval(fetchLogsData, 1000000);
        return () => clearInterval(intervalId);
    }, [])

    return (
        <div>
            <Sidebar name={name} />
            <section className='home-section'>
                <nav>
                    <div class="sidebar-button">
                        <span class="dashboard">Logs</span>
                        <Signout name={name} />
                    </div>
                </nav>
                <div className='home-content'>
                    {logsData.data === null ? <h2>Loading</h2> :
                        <table id="sensors">
                            <caption style={{ fontSize: "150%", backgroundColor: "#25523b", color: "#f2f2f2", padding: "15px 0px 15px 15px", textAlign: "left" }}>Logs Data</caption>
                            <caption style={{ fontSize: "150%", backgroundColor: "#25523b", color: "#f2f2f2", textAlign: "center" , position: "absolute", left: "55%", top: "1.5%" }}>Filter: </caption>
                            <caption style={{ position: "absolute", left: "62%", top: "1.5%" }}><button className= 'filterData' onClick={() => filterData(logsData, day)} style={{}}>Today</button></caption>
                            <caption style={{ position: "absolute", left: "72%", top: "1.5%" }}><button className= 'filterData' onClick={() => filterData(logsData, month)} style={{}}>This Month</button></caption>
                            <caption style={{ position: "absolute", left: "85%", top: "1.5%" }}><button className= 'filterData' onClick={() => filterData(logsData, all)} style={{}}>All Data</button></caption>
                            <thead>
                                <tr>
                                    <th>Sl.no</th>
                                    <th>Status</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ?
                                    filtered.map((value, index) => {
                                        return <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.status}</td>
                                            <td>{moment(value.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                        </tr>
                                    }) : logsData.map((value, index) => {
                                        return <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.status}</td>
                                            <td>{moment(value.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>}
                </div>
            </section>
        </div>
    )
}

export default Logs
