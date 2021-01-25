import React, { useState, useEffect } from 'react'
import { fetchDailyDate } from '../../api/index'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

function Chart({ data: { confirmed, recovered, deaths }, country }) {
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyDate())
        }

        fetchAPI()
    }, [])

    const lineChart = (
        dailyData.length !== 0
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Заболело',
                            borderColor: '#3333ff',
                            fill: true
                        },
                        {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Умерло',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true
                        }]
                    }}
                />) : null

    )


    const barChar = (
        confirmed
            ? (
                < Bar
                    data={{
                        labels: ['Заболели', 'Выздоровели', 'Умерли'],
                        datasets: [{
                            label: 'Люди',
                            backgroundColor: ['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)'],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Текущая статистика в ${country}` }
                    }}
                />
            )
            : null
    )




    return (
        <div className={styles.container}>
            {country ? barChar : lineChart}
        </div>
    )
}

export default Chart
