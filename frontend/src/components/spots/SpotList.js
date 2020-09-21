import React from 'react'
import { Link } from 'react-router-dom'

const SpotList = ({ spot, country, image, waveType, difficulty, season, description, _id }) => (

  <Link to={`/spots/${_id}`} className="box">
    <div className="column is-full SpotsListCard">
      <div className="columns">
        <img src={image} alt={spot} className="column is-one-quarter is-mobile index-image" />
        <div className="column is-multiline">
          <div className="column is-full">
            <h1 className="subtitle">{spot}, {country}</h1>
            <div className="card-content">
              <p className="">{waveType}</p>
              <p className="">{difficulty}</p>
              <p className="">{season}</p>
              <p className="">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>

)

export default SpotList