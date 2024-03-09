import { useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import moment from 'moment/moment';
import Signout from '../components/Signout';
import * as XLSX from 'xlsx/xlsx.mjs'

const Summary = ({ name, baseURL }) => {

  document.title = "Summary Report"
  const [summary, setSummary] = useState([])
  const [filtered, setFiltered] = useState([])
  // const name = "Ghost"
  const fetchSensorData = async () => {
    try {
      const response = await axios.get(`${baseURL}/summary_report`)
      // console.log(response.data)
      setSummary(response.data)
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

  // const getday = () => {
  //   let currentDate = new Date();
  //   let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //   let monthIndex = currentDate.getMonth();
  //   let month = months[monthIndex];
  //   let day = currentDate.getDate();
    
  //   // Format the date as "MMM, D"
  //   let formattedDate = month + ' ' + + (day < 10 ? '0' : '') + day + ',';
  //   // console.log(formattedDate)
  //   return formattedDate.toString;
  // }

  const getday = () => {
    let currentDate = new Date();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let dayIndex = currentDate.getDay();
    let monthIndex = currentDate.getMonth();
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    
    // Format the date as "Day MMM DD YYYY"
    let formattedDate = days[dayIndex] + ' ' + months[monthIndex] + ' ' + (day < 10 ? '0' : '') + day + ' ' + year;
    
    return formattedDate;
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

  const handleClick = () => {
    var wb = XLSX.utils.table_to_book(document.getElementById("sensors"))
    var ws = wb.Sheets["Sheet1"];
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
          <table id="sensors">
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
          </table>
        </div>
      </section >
    </div>
  )
}

export default Summary

