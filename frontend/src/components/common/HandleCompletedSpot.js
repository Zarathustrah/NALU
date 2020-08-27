import React from 'react'
import { Link } from 'react-router-dom'
import { getAllSpots } from '../../lib/api'

class HandleCompletedSpot extends React.Component {
  state = {
    spots: null
  }

  async componentDidMount() {
    try {
      const res = await getAllSpots()
      console.log(res.data)
      this.setState(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { spots } = this.state
    if (!spots) return null

    return (
      <div className="column is-full fav-comp">
          <div className="columns">
          <Link to={`/surfspots/${spots._id}`}>
            <img className="column is-three-fifths group-image" src={spots.image} height="50" width="70" alt="surfSpot Img"/>
          </Link><div className="column">
            <div>
              <Link to={`/surfspots/${spots._id}`}><p>{spots.name}</p></Link>
                {this.edit && <button
                  className="button remove"
                  onClick={handleClick}
                  value={spots._id}
                  name="completed"
                >Remove</button>}
              </div>
            </div>
          </div>
      </div>
    )
  }

}

export default HandleCompletedSpot