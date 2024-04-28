import React from 'react'
import axios from 'axios';
import moment from 'moment/moment';
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from "chart.js";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const EcChart = ({ baseURL }) => {

    const [chartData, setChartData] = useState([])
    const fetchSensorData = async () => {
        try {
            const response = await axios.get(`${baseURL}/sensor_data`)
                // console.log(response.data)
                setChartData(response.data.reverse()) 
        }
        catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        fetchSensorData()
        const intervalId = setInterval(fetchSensorData, 60001*15);

        return () => clearInterval(intervalId);
    }, [])


    if(chartData){
        const ecChartData = chartData.map(value => ({ x: value.ec,y: value.timestamp}))
        //console.log(tempChartData)
        const data = {
            labels: ecChartData.map(value => moment(value.y).format('LT')),
            datasets: [
                {
                    fill: true,
                    label: "Ec of Nutrient Solution",
                    data: ecChartData.map(value => value.x),
                    borderColor: 'hsl(120, 90%, 29%)',
                    // backgroundColor: 'hsl(120, 90%, 29%)',
                    pointBorderColor:'hsl(250, 60%, 61%)',
                    tension:0.4
                }
            ]
        }

        const options = {
            responsive:true,
            elements: {
            point:{
                radius:5,
                borderWidth: 1.5,
                hoverRadius:4
                }
            }
            
        }

        

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
    }
}

export default EcChart
