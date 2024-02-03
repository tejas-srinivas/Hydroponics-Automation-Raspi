import { useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import moment from 'moment/moment';
import Signout from '../components/Signout';

const Summary = ({name}) => {

  document.title = "Summary Report"
  const [summary, setSummary] = useState([])
  // const name = "Ghost"
  const fetchSensorData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/summary_report")
      // console.log(response.data)
      setSummary(response.data)
    }
    catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchSensorData()
    const intervalId = setInterval(fetchSensorData, 61000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div>
      <Sidebar name={name}/>
      <section class="home-section">
        <nav>
          <div class="sidebar-button">
            <span class="dashboard">Summary Report</span>
              <Signout name={name}/>
          </div>
        </nav>
        <div className='home-content'>
          <table>
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
              {
                summary.map((value, index) => {
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

