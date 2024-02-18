import { useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar";
import TempChart from '../components/TempChart';
import axios from 'axios';
import moment from 'moment/moment';
import Signout from '../components/Signout';

const TempAnalysis = ({name}) => {

  document.title = "Temp Analysis"
  const baseURL = "https://smarthydro-auth-api.onrender.com"
  
  // State variables for data and loading status
  const [tempsummary, setTempSummary] = useState([])
  // const name = "Ghost"
  const fetchTempData = async () => {
    try {
      const response = await axios.get(`${baseURL}/temp_report`)
      // console.log(response.data)
      setTempSummary(response.data)
    }
    catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchTempData()
    const intervalId = setInterval(fetchTempData, 61000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div>
      <Sidebar name={name}/>
      <section class="home-section">
        <nav>
          <div class="sidebar-button">
            <span class="dashboard">Temperature Analysis</span>
              <Signout name={name} />
          </div>
        </nav>
        <div class="home-content-ph" style={{ display: "block" }}>

          <div className="graph-box" >
            <div class="history-charts-1" style={{}}>
              <div class="title">Temperature Analysis</div>
              <TempChart />
            </div>
          </div>
          <br></br>

          <h2 style={{margin:"auto", marginLeft:"2%"}}>Temperature Data</h2>
          <table>
            <thead>
              <tr>
                <th>Sl.no</th>
                <th>Temperature</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {
                tempsummary.map((value, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.temperature} ºC</td>
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

export default TempAnalysis
