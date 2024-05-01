import { useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import moment from 'moment/moment';
import Signout from '../components/Signout';
import * as XLSX from 'xlsx/xlsx.mjs'
import Table from '../components/Table';

const Summary = ({ name, baseURL }) => {

  document.title = "Summary Report"
  const [data, setData] = useState([])
  const [filtered, setFiltered] = useState([])
  const fetchSensorData = async () => {
    try {
      const response = await axios.get(`${baseURL}/summary_report`)
      // console.log(response.data)
      setData(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSensorData()
    const intervalId = setInterval(fetchSensorData, 60001 * 15);
    return () => clearInterval(intervalId);
  }, [])

  const columns = [
    {
      header: 'Temperature',
      accessorKey: 'temperature',
    },
    {
      header: 'Light',
      accessorKey: 'lux',
    },
    {
      header: 'Humidity',
      accessorKey: 'humidity',
    },
    {
      header: 'PH',
      accessorKey: 'ph',
    },
    {
      header: 'EC',
      accessorKey: 'ec',
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

  const handleClick = () => {
    // Convert your data to worksheet
    data.forEach((column, index) => {
      column._id = index + 1;
      column.timestamp = moment(column.timestamp).format('lll');
    })
    const ws = XLSX.utils.json_to_sheet(data);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Add additional data to the worksheet
    XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], { origin: -1 });

    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(wb, "Sensor_Report.xlsx");
}

  return (
    <div>
      <Sidebar name={name} />
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <span className="dashboard">Summary Report</span>
            <Signout name={name} />
          </div>
        </nav>
        <div className='home-content'>
          <caption><button className='export' onClick={handleClick} style={{ border: "none", fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#2db83d", cursor: "pointer", color: "#f2f2f2", padding: "10px 15px 10px 15px", width:"110px", position:'absolute', justifyContent:'end' }}>Export xlsx</button></caption>
          <Table data={data} id="sensors" columns={columns} filtered={filtered} title="Summary Report" filterData={filterData} />
          {/* <table id="sensors">
            <caption style={{ fontSize: "150%", backgroundColor: "#25523b", color: "#f2f2f2", padding: "15px 0px 15px 15px", textAlign: "left" }}>Real Time Sensor Data
              <div style={{ position: "absolute", display: "flex", gap: "10px", alignItems: "center", marginLeft: "25rem", marginTop: "-2.5rem" }}>
                <caption style={{ color: "#f2f2f2", textAlign: "center", position: "relative" }}>Filter: </caption>
                <caption><button className='filterData' onClick={() => filterData(summary, day)} style={{}}>Today</button></caption>
                <caption ><button className='filterData' onClick={() => filterData(summary, month)} style={{}}>This Month</button></caption>
                <caption><button className='filterData' onClick={() => filterData(summary, all)} style={{}}>All Data</button></caption>
                <caption><button className='export' onClick={handleClick} style={{ border: "none", fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#2db83d", cursor: "pointer", color: "#f2f2f2", padding: "10px 25px 10px 25px" }}>Export xlsx</button></caption>
              </div>
            </caption>
            <thead>
              <tr>
                <th>Sl.no</th>
                <th>Temperature</th>
                <th>Light</th>
                <th>Humidity</th>
                <th>pH</th>
                <th>EC</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ?
                filtered.map((value, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.temperature} ºC</td>
                    <td>{value.lux} lx</td>
                    <td>{value.humidity} %</td>
                    <td>{value.ph} pH</td>
                    <td>{value.ec} EC</td>
                    <td>{moment(value.timestamp).format('lll')}</td>
                  </tr>
                }) : summary.map((value, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.temperature} ºC</td>
                    <td>{value.lux} lx</td>
                    <td>{value.humidity} %</td>
                    <td>{value.ph} pH</td>
                    <td>{value.ec} EC</td>
                    <td>{moment(value.timestamp).format('lll')}</td>
                  </tr>
                })
              }
            </tbody>
          </table> */}
        </div>
      </section >
    </div>
  )
}

export default Summary

