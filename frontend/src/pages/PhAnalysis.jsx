import { useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar";
import PhChart from '../components/PhChart';
import axios from 'axios';
import Signout from '../components/Signout';
import moment from 'moment/moment';

const PhAnalysis = ({name}) => {

  document.title = "pH Analysis"
  const baseURL = "https://smarthydro-auth-api.onrender.com"
  const [phsummary, setPhSummary] = useState([])
  // const name = "Ghost"
  const fetchPhData = async () => {
    try {
      const response = await axios.get(`${baseURL}/ph_report`)
      // console.log(response.data)
      setPhSummary(response.data)
    }
    catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchPhData()
    const intervalId = setInterval(fetchPhData, 61000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div>
      <Sidebar name={name}/>
      <section class="home-section">
        <nav>
          <div class="sidebar-button">
            <span class="dashboard">pH Analysis</span>
              <Signout name={name}/>
          </div>
        </nav>
        <div class="home-content-ph" style={{ display: "block" }}>

          <div className="graph-box" >
            <div class="history-charts-1" style={{}}>
              <div class="title">Ph Analysis</div>
              <PhChart />
            </div>
          </div>
          <br></br>

          <h2>Ph Data</h2>
          <table>
            <thead>
              <tr>
                <th>Sl.no</th>
                <th>pH</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {
                phsummary.map((value, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.ph} pH</td>
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

export default PhAnalysis
