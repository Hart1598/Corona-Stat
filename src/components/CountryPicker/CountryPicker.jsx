import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import styles from './CountryPicker.module.css'

import { fetchCountries } from '../../api'

function ConntryPicker({ handleCountryChange }) {
    const [fetchedCounties, setFetchedCounties] = useState([])


    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCounties(await fetchCountries())
        }

        fetchAPI()

    }, [setFetchedCounties])




    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                {fetchedCounties.map((country, idx) => <option key={idx} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default ConntryPicker
