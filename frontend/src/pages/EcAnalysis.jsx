import { useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar";
import EcChart from '../components/EcChart';
import axios from 'axios';
import moment from 'moment/moment';
import Signout from '../components/Signout';

const EcAnalysis = ({name, baseURL}) => {

  document.title = "EC Analysis"
  const [ecsummary, setEcSummary] = useState([])
  // const name = "Ghost"
  const fetchEcData = async () => {
    try {
      const response = await axios.get(`${baseURL}/ec_report`)
      // console.log(response.data)
      setEcSummary(response.data)
    }
    catch (error) {
      const errorMsg = "Error connecting to backend"
      return errorMsg
    }

  }

  useEffect(() => {
    fetchEcData()
    const intervalId = setInterval(fetchEcData, 60001*15);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div>
      <Sidebar name={name}/>
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <span className="dashboard">EC Analysis</span>
            <Signout name={name}/>
          </div>
        </nav>
        <div className="home-content-ph" style={{ display: "block" }}>

          <div className="graph-box" >
            <div className="history-charts-1" style={{}}>
              <div className="title">Ec Analysis</div>
              <EcChart baseURL={baseURL}/>
            </div>
          </div>
          <br></br>

          <h2 style={{margin:"auto", marginLeft:"2%"}}>Ec Data</h2>
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

