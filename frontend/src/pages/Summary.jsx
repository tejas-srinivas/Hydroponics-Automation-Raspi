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
            <caption style={{ fontSize: "150%", backgroundColor: "#25523b", color: "#f2f2f2", padding: "15px 0px 15px 15px", textAlign: "left" }}>Real Time Sensor Data</caption>
            <caption style={{ fontSize: "150%", backgroundColor: "#25523b", color: "#f2f2f2", textAlign: "center" , position: "absolute", left: "55%", top: "0.5%" }}>Filter: </caption>
            <caption style={{ position: "absolute", left: "32%", top: "1%" }}><button className='export' onClick={handleClick} style={{ border: "none", fontFamily: "Poppins", borderRadius: "10px", backgroundColor: "#2db83d", cursor: "pointer", color: "#f2f2f2", padding: "10px 25px 10px 25px" }}>Export xlsx</button></caption>
            <caption style={{ position: "absolute", left: "62%", top: "0.5%" }}><button className='filterData' onClick={() => filterData(summary, day)} style={{}}>Today</button></caption>
            <caption style={{ position: "absolute", left: "72%", top: "0.5%" }}><button className='filterData' onClick={() => filterData(summary, month)} style={{}}>This Month</button></caption>
            <caption style={{ position: "absolute", left: "85%", top: "0.5%" }}><button className='filterData' onClick={() => filterData(summary, all)} style={{}}>All Data</button></caption>
            <thead>
              <tr>
                <th>Sl.no</th>
                <th>Temperature</th>
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
                    <td>{value.humidity} %</td>
                    <td>{value.ph} pH</td>
                    <td>{value.ec} EC</td>
                    <td>{moment(value.timestamp).format('lll')}</td>
                  </tr>
                }) : summary.map((value, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.temperature} ºC</td>
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

