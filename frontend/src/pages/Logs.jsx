import React, { useState, useEffect } from 'react'
import Sidebar from "../components/Sidebar";
import Signout from '../components/Signout';
import axios from 'axios';
import moment from 'moment/moment';

const Logs = ({ name, baseURL }) => {

    document.title = "IoT Logs"
    const [logsData, setLogsData] = useState([])
    // const name = "Ghost"
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

    useEffect(() => {
        fetchLogsData()
        const intervalId = setInterval(fetchLogsData, 10000);
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
                            <thead>
                                <tr>
                                    <th>Sl.no</th>
                                    <th>Status</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    logsData.map((value, index) => {
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
