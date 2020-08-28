import React from 'react'
import { Link } from 'react-router-dom'
const HandleCompletedSpot = (props) => {
  const { edit } = props
  console.log('HandleCompletedSpot edit', edit)
  console.log('HandleCompletedSpot id', props._id)
  console.log('HandleCompletedSpot spot',props.spot)
  return (
    <div className="column is-full fav-comp">
        <div className="columns">
        <Link to={`/surfspots/${props.spot}`}>
          <img className="column is-three-fifths group-image" src={props.spot.image} height="50" width="70" alt="surfSpot Img"/>
        </Link><div className="column">
          <div>
            <Link to={`/surfspots/${props.spot}`}><p>{props.spot.name}</p></Link>
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