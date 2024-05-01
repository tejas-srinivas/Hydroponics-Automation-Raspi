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

const TempChart = ({ baseURL }) => {

    const [chartData, setChartData] = useState([])
    const fetchTempData = async () => {
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
        fetchTempData()
        const intervalId = setInterval(fetchTempData, 100000);

        return () => clearInterval(intervalId);
    }, [])


    if(chartData){
        const tempChartData = chartData.map(value => ({ x: value.temperature,y: value.timestamp}))
        //console.log(tempChartData)
        const data = {
            labels: tempChartData.map(value => moment(value.y).format('LT')),
            datasets: [
                {
                    fill: true,
                    label: "Environment Temperature",
                    data: tempChartData.map(value => value.x),
                    borderColor: 'hsl(120, 90%, 29%)',
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

export default TempChart
