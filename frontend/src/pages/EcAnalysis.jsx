import { useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar";
import EcChart from '../components/EcChart';
import axios from 'axios';
import moment from 'moment/moment';
import Signout from '../components/Signout';

const EcAnalysis = ({name}) => {

  const [ecsummary, setEcSummary] = useState([])
  // const name = "Ghost"
  const fetchEcData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/ec_report")
      // console.log(response.data)
      setEcSummary(response.data)
    }
    catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchEcData()
    const intervalId = setInterval(fetchEcData, 61000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div>
      <Sidebar name={name}/>
      <section class="home-section">
        <nav>
          <div class="sidebar-button">
            <span class="dashboard">EC Analysis</span>
            <Signout name={name}/>
          </div>
        </nav>
        <div class="home-content-ph" style={{ display: "block" }}>

          <div className="graph-box" >
            <div class="history-charts-1" style={{}}>
              <div class="title">Ec Analysis</div>
              <EcChart/>
            </div>
          </div>
          <br></br>

          <h2>Ec Data</h2>
          <table>
            <thead>
              <tr>
                <th>Sl.no</th>
                <th>Ec</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {
                ecsummary.map((value, index) => {
                  return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.ec} mS/cm</td>
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

export default EcAnalysis

