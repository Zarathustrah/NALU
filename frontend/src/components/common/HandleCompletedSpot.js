import React from 'react'
import { Link } from 'react-router-dom'

const HandleCompletedSpot = (props) => {
  return (
    <div className="column is-full fav-comp">
      <div className="columns">
      <Link to={`/surfspots/${props._id}`}>
        <img className="column is-three-fifths group-image" src={props.image} height="50px" width="70px" alt="surfSpot Img"/>
      </Link>
      </div>
    </div>
  )
}

export default HandleCompletedSpot