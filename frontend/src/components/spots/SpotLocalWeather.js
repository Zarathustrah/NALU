import React from 'react'
import { getLocalWeatherStatus, getMarineWeatherStatus } from '../../lib/api'

class SpotLocalWeather extends React.Component {
  state = {
    localWeather: null,
    marineWeather: null,
    lat: '',
    long: ''
  }

  async componentDidMount() {
    try {
      const resWeather = await getLocalWeatherStatus()
      const resMarine = await getMarineWeatherStatus()
      console.log(`weather ${resWeather}, marine ${resMarine}`)
      this.setState({  localWeather: resWeather.data, marineWeather: resMarine.data })
    } catch (err) {
      console.log(err)
    }
  }

  convertKelvinToCelcius = () => {
    return this.state.localWeather.main[0] - 275.15
  } 
  
  render() {
    console.log(this.state)
    const { localWeather } = this.state
    if (!localWeather) return null

    return (
      <section className="column is-one-third local-weather">
        <h1>Local Weather</h1>
        <h1>{localWeather.weather[0].main}</h1>
        <img src={localWeather.weather[0].icon} alt="weather-icon" />
        <h1>{localWeather.main[0]}°C</h1>
      </section>
    )
  }
}

export default SpotLocalWeather