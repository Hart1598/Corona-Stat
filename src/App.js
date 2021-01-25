import React, { useEffect, useState } from 'react'

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'

import coronaImage from './img/image.png'

export default function App() {

    const [data, setData] = useState({})
    const [country, setCountry] = useState('')

    useEffect(() => {
        const fetchInfo = async () => {
            const data = await fetchData()

            setData(data);
        };

        fetchInfo();
    }, []);

    const handleCountryChange = async (country) => {
        const countryData = await fetchData(country)

        if (countryData) {
            setCountry(countryData)
            setData(countryData)
        }
        else {
            const data = await fetchData()
            setCountry('')
            setData(data);
        }
    }

    return (
        <div className={styles.container}>
            <img className={styles.img} src={coronaImage} alt="COVID-19" />
            <Cards data={data} />
            <CountryPicker handleCountryChange={handleCountryChange} />
            <Chart data={data} country={country} />
        </div>
    )
}
