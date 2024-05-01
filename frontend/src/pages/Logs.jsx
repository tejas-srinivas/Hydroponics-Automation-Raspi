import React, { useState, useEffect } from 'react'
import Sidebar from "../components/Sidebar";
import Signout from '../components/Signout';
import axios from 'axios';
import Table from '../components/Table';
import moment from 'moment/moment';

const Logs = ({ name, baseURL }) => {

    document.title = "IoT Logs"
    const [data, setData] = useState([])
    const [filtered, setFiltered] = useState([])
    const fetchLogsData = async () => {
        try {
            const response = await axios.get(`${baseURL}/logs_data`)
            // console.log(response)
            setData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const columns = [
        {
            header: 'Action',
            accessorKey: 'status',
        },
        {
            header: 'Time-Stamp',
            accessorKey: 'timestamp',
            cell: info => moment(info.getValue()).format('lll')
        },
    ]

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
                    <div className="sidebar-button">
                        <span className="dashboard">Logs</span>
                        <Signout name={name} />
                    </div>
                </nav>
                <div className='home-content'>
                    <Table data={data} columns={columns} filtered={filtered} title="Logs Data" filterData={filterData}/>
                </div>
            </section>
        </div>
    )
}

export default Logs
