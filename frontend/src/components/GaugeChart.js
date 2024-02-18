import React from 'react'
import GaugeComponent from 'react-gauge-component'

const GaugeChart = (props) => {
    return (
        <div>
            <GaugeComponent
                type="semicircle"
                arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    color:"#000000",
                    // gradient: true,
                    subArcs: [
                        {
                            limit: 15,
                            color: '#EA4228',
                            showTick: true,
                            tooltip: {
                                text: 'Too low temperature!'
                            },
                        },
                        {
                            limit: 17,
                            color: '#F5CD19',
                            showTick: true,
                            tooltip: {
                                text: 'Low temperature!'
                            }
                        },
                        {
                            limit: 28,
                            color: '#5BE12C',
                            showTick: true,
                            tooltip: {
                                text: 'Optimal temperature!'
                            }
                        },
                        {
                            limit: 38, color: '#F5CD19', showTick: true,
                            tooltip: {
                                text: 'High temperature!'
                            }
                        },
                        {
                            color: '#EA4228',
                            tooltip: {
                                text: 'Too high temperature!'
                            }
                        }
                    ]
                }}
                pointer={{
                    color: '#22523b',
                    length: 0.80,
                    width: 20,
                    elastic: true,
                }}
                labels={{
                    valueLabel: { formatTextValue: value => value + 'ºC', color:'#000000' },
                    tickLabels: {
                        type: 'outer',
                        valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 15, color:"#000000" },
                        ticks: [
                            { value: 13 },
                            { value: 22.5 },
                            { value: 33.5 },
                            { value: 45 }
                        ],
                    }
                }}
                value={props.temp}
                minValue={10}
                maxValue={45}
            />
        </div>
    )
}

export default GaugeChart

