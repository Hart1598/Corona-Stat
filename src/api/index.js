import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    let changeableURL = url;

    if (country) {
        changeableURL = `${url}/countries/${country}`
    }

    try {
        const response = await axios.get(changeableURL)

        const data = await response.data

        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }


        return modifiedData
    }
    catch (error) {
        console.log(error)
    }
}

export const fetchDailyDate = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
        return modifiedData

    }
    catch (e) {
        console.log(e)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)

        return countries.map((country) => country.name)
    }
    catch (e) {
        console.log(e)
    }
}