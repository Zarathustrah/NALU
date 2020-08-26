import React from 'react'
import ReactStars from "react-rating-stars-component"

import SpotMiniMap from './SpotMiniMap'
import SpotComments from './SpotComments'

import { Link } from 'react-router-dom'
import { showSingleSpot, deleteSpot, commentSpot, deleteSpotComment, getUser, getMarineWeatherStatus, getLocalWeatherStatus } from '../../lib/api'
import { isAuthenticated, isOwner, getUserId } from '../../lib/auth'
import SpotLocalWeather from './SpotLocalWeather'

class SpotShow extends React.Component {
  state = {
    spot: null,
    errors: '',
    averageRating: '',
    modalImageOn: false,
    uploadImageOn: false,
    user: '',
    commentRating: '',
    commentText: '',
    comment: {
      text: '',
      rating: ''
    },
    localWeather: null,
    localMarineWeather: null
  }

  async componentDidMount() {
    try {
      const res = await showSingleSpot(this.props.match.params.id)
      const loggedIn = await isAuthenticated()

      if (!loggedIn) {
        this.setState({ spot: res.data, user: '' }, () => {this.handleRating()})
        // this.setState({ spot: res.data, user: '' })
      } else {
        const currentUserId = await getUserId()
        const currentUser = await getUser(currentUserId)
        this.setState({ spot: res.data, user: currentUser.data }, () => {this.handleRating()})
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteSpot = async () => {
    try {
      await deleteSpot(this.props.match.params.id)
      this.props.history('/surfspots')

    } catch (err) {
      console.log(err)
    }
  }

  handleCommentSubmit = async (e, rating, text) => {
    e.preventDefault()
    try {
      const spotId = this.props.match.params.id
      await commentSpot(spotId, { rating: rating, text: text })
      const res = await showSingleSpot(spotId)
      this.setState({ spot: res.data, error: '', commentText: '', commentRating: '' }, () => {this.handleRating()})
    } catch (err) {
      this.setState({ errros: JSON.parseFloat(err.response.config.data)})
    }
  }

  handleCommentDelete = async event => {
    event.preventDefault()
    const spotId = this.props.match.params.id
    const commentId = event.target.id
    try {
      await deleteSpotComment(spotId, commentId)
      const res = await showSingleSpot(spotId)
      this.setState({ spot: res.data },() => {this.handleRating()})
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  
  handleRating = () => {
    const comments = this.state.spot.comments
    const ratings = comments.map(comment => {
      return comment.rating
    })
    const averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(0)
    this.setState({ averageRating })
  }

  render() {
    if (!this.state.spot) return null
    const { spot, averageRating } = this.state
    return (
      <div className="SpotShow box">
        <div className="hero is-medium is-success">
          <div className="hero-body" style={{ backgroundImage: `url(${spot.image})` }}>
            <h1 className="title-logo">{spot.spot}, {spot.country}</h1>
          </div>
        </div>
      
        <div className="weather-info">
          <div className="columns is-multiline">
          <section className="column is-one-third spot-info">
            <h1>Difficulty: {spot.difficulty} </h1>
            <h1>Seasons: {spot.season} </h1>
            <h1>Wave Type: {spot.waveType}</h1>
            <h1>Average Rating:
                <ReactStars
                  count={5}
                  size={20}
                  half={false}
                  value={parseInt(averageRating)}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#0096c7"
                  edit={false}
                  />
            </h1>
          </section>
          <section className="column is-one-third local-weather">
            <SpotLocalWeather
              localWeather={this.state.spot.localWeather}
              />
          </section>
          <section className="column is-one-third marine-weather">
            <h1>Marine Weather</h1>
            <h1>Sea Level </h1>
            <h1>Swell Direction </h1>
            <h1>Swell Height </h1>
            <h1>Water Temp </h1>
            <h1>Wave Height </h1>
          </section> 
              <hr />
          <section className="description-box">
          <h1 className="title-show">Description:</h1>
            <p>{spot.description}</p>
            <hr />
          </section>
              <div className="columns is-multiline">
                <div className="column is-half-desktop">
                  <h1 className="title-show">Location: {spot.region}, {spot.country}</h1>
                  <br />
                  <SpotMiniMap
                    spot={this.state.spot}
                    />
                </div>
                <div className="column is-half-desktop">
                  <section className="comment-spot">
                    <SpotComments
                      comment={this.state.spot.comments}
                      handleCommentDelete={this.handleCommentDelete}
                      handleCommentSubmit={this.handleCommentSubmit}
                      errors={this.state.errors}
                      commentText={this.state.commentText}
                      commentRating={this.state.commentRating}
                    />
                  </section>
                </div>
              </div>

          </div>
        </div>
      </div>
    )
  }
}

export default SpotShow