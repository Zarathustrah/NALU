import React from 'react'
import { Link } from 'react-router-dom'
import Truncate from 'react-truncate'




const SpotCard = ({ spot, country, image, waveType, difficulty, season, description, _id }) => (



  <div className="column is-one-third-desktop is-one-third-tablet is-fullwidth SpotCard">
    <Link to={`/surfspots/${_id}`}>
        <div className="card">
          <div className="card-image">
            <figure className="image image is-1by1">
            <img src={image} alt={spot} width="325" height="150" />
            </figure>
          </div>
      
          <div className="card-content">
          <h5 className="is-size-5 has-text-black has-text-left pb-5">{spot}, {country}</h5>
            <section className="pb-5">
            <p className="">Break: {waveType}</p>
            <p className="">Difficulty: {difficulty}</p>
            <p className="">Season: {season}</p>
            </section>
            <div>
            <Truncate lines={5} ellipsis={<span>...</span>}>{description}</Truncate>            
          </div>
          </div>
          <div className="card-image">
          </div>
        </div>
    </Link>
    </div>

)

export default SpotCard


