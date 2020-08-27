import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ username, profileImage, achievedSurfSpot, _id }) => {

  return  (
    <div key={_id} className="user-card-container">
      <div>
        <figure>
          <Link to={`/profiles/${username}`}>
            <img className="user-img" src={profileImage} alt={username} />
          </Link>
        </figure>
      </div>
      <div>
        <div>
          <h4 className="use-card">{username}</h4>
        </div>
        <div>
          <h4 className="use-card">{profileImage}</h4>
        </div>
        <div>
          <h5 className="use-card">{achievedSurfSpot}</h5>
        </div>
      </div>
    </div>
  )
}
export default UserCard