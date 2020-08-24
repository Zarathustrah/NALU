import React from 'react'
// import { link } from 'react-router-dom'
// import StarRatings from 'react-star-ratings'
// import { showSingleSpot, deleteSpot } from '../../lib/api'
import { showSingleSpot } from '../../lib/api'  //! Delete once other functionality is working


class SpotShow extends React.Component {
  state = {
    rating: null,
    spot: null
  }
  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    })
  }

  async componentDidMount() {
    const spotID = this.props.match.params.id
    try {
      const res = await showSingleSpot(spotID)
      this.setState({ spot: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // handleDelete = async () => {
  //   const spotID = this.props.match.params.id
  //   try {
  //     await deleteSpot(spotID)
  //     this.props.history.push('/surfspots')
  //   } catch (err) {
  //     console.log(err.response.data)
  //   }
  // }

  render() {
    const { spot } = this.state

    if(!spot) return null
    return (

      // <StarRatings
      //   rating={this.state.rating}
      //   starRatedColor="blue"
      //   changeRating={this.changeRating}
      //   numberOfStars={6}
      //   name='rating'
      // />

      <div className="tile is-ancestor">
        <div className="tile is-verticle is-full">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child has-background-light">
                <p className="title">{spot.spot}</p>
                <p className="subtitle is-4">`{spot.region}, {spot.country}, {spot.country}</p>
              </article>
              <article className="tile is-child has-background-light">
                <p className="subtitle is-5">

                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SpotShow