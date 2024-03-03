import { useEffect, useState } from 'react'
import Sidebar from "../components/Sidebar";
import PhChart from '../components/PhChart';
import axios from 'axios';
import Signout from '../components/Signout';
import moment from 'moment/moment';

const PhAnalysis = ({name, baseURL}) => {

  document.title = "pH Analysis"
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
    const intervalId = setInterval(fetchPhData, 60001*15);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div>
      <Sidebar name={name}/>
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <span className="dashboard">pH Analysis</span>
              <Signout name={name}/>
          </div>
        </nav>
        <div className="home-content-ph" style={{ display: "block" }}>

          <div className="graph-box" >
            <div className="history-charts-1" style={{}}>
              <div className="title">Ph Analysis</div>
              <PhChart baseURL={baseURL} />
            </div>
          </div>
          <br></br>

          <h2 style={{margin:"auto", marginLeft:"2%"}}>Ph Data</h2>
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
