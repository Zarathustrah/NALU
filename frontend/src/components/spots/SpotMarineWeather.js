import React from 'react'
// import { getMarineWeatherStatus, getAllSpots } from '../../lib/api'
// import SpotLocalWeather from './SpotLocalWeather'

class SpotMarineWeather extends React.Component {
  render() {
    return (
      <section className="column is-one-third marine-weather">
            <h1>Marine Weather</h1>
            <h1>Sea Level </h1>
            <h1>Swell Direction </h1>
            <h1>Swell Height </h1>
            <h1>Water Temp </h1>
            <h1>Wave Height </h1>
          </section> 
    )
  }
}

export default SpotMarineWeather