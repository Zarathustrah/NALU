import React from 'react'
import { Link } from 'react-router-dom'

const HandleCompletedSpot = (props) => {

  const { edit } = props

  return (
    <div className="column is-full fav-comp">
        <div className="columns">
        <Link to={`/surfspots/${props.spot._id}`}><img className="column is-three-fifths group-image" src={props.hike.image} alt="surfSpot Img"/></Link>
          <div className="column">
            <div>
            <Link to={`/hikes/${props.hike._id}`}><p>{props.hike.name}</p></Link>
              {edit && <button
                className="button remove"
                onClick={props.handleClick}
                value={props._id}
                name="completed"
              >Remove</button>}
            </div>
          </div>
        </div>
    </div>
  )
}

export default HandleCompletedSpot