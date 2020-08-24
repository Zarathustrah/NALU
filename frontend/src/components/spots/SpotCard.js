import React from 'react'
import { Link } from 'react-router-dom'

const SpotCard = ({ spot, country, image, waveType, difficulty, season, description, _id }) => (

    <Link to={`/surfspots/${_id}`} className="box">
      <div className="column is-full SpotCard">
        <div className="column">
          <img src={image} alt={spot} className="column is-one-quarter is-mobile index-image"/>
          <div className="column columns is-multiline">
            <div className="column is-full">
              <h4 className="card-header-title">{spot}, {country}</h4>
            </div>
          </div>
          <div className="card-image">
          </div>
          <div className="card-content">
            <p className="">{waveType}</p>
            <p className="">{difficulty}</p>
            <p className="">{season}</p>
            <p className="">{description}</p>
          </div>
        </div>
      </div>
    </Link>

)

export default SpotCard