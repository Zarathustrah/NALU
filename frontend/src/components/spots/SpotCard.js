import React from 'react'
import { Link } from 'react-router-dom'

const SpotCard = ( spot, image, country, region, continent, waveType, difficulty, season,  _id ) => {
  return <Link to={`/api/spots/${_id}`}>

  </Link>
}


export default SpotCard