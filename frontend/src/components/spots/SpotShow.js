/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import ReactStars from "react-rating-stars-component";

// import ReactImgModal from '../common/ReactImgModal'
// import ReactImgUpload from '../common/ImageUpload'
import SpotMiniMap from './SpotMiniMap'
import SpotComments from './SpotComments'

import { Link } from 'react-router-dom'
import { showSingleSpot, deleteSpot, commentSpot, deleteSpotComment, getUser } from '../../lib/api'
import { isAuthenticated, isOwner, getUserId } from '../../lib/auth'

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
    }
  }

  async componentDidMount() {
    try {
      const res = await showSingleSpot(this.props.match.params.id)
      const loggedIn = await isAuthenticated()

      if (!loggedIn) {
        this.setState({ spot: res.data, user: '' }, () => {this.handleRating()})
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
      this.setState({ spot: res.data },() => {this.getAverageRating()})
    } catch (err) {
      console.log(err)
    }
  }
  
  handleRating = () => {
    // ! back end related
    const comments = this.state.spot.comments
    const ratings = comments.map(comment => {
      return comment.rating
    })
    const averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(0)
    this.setState({ averageRating })
  }

  render() {
    if (!this.state.spot) return null
    const { spot, averageRating, modalImageOn } = this.state
    return (
      <div className="SpotShow box">
        <div className="hero is-medium is-success">
          <div className="hero-body" style={{ backgroundImage: `url(${spot.images})` }}>
            <h1 cassName="title-logo">{spot.spot}, {spot.country}</h1>
          </div>
        </div>
      
        <div className="box">
          <section className="spot-info">
            <h1 className="title">Description:</h1>
            <p>{spot.description}</p>
            <hr />
            <h1>Difficulty: {spot.difficulty.map(difficulty => {
              return `${difficulty}`
            })}
            </h1>
            <h1>Seasons: {spot.seasons.map(season => {
              return `${season}`
              })}
              </h1>

              //* WEATHER APIS INSERTED HERE

              <h1>Average Rating:
                <ReactStars
                  count={5}
                  size={11}
                  half={true}
                  value={parseInt(averageRating)}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#0096c7"
                  edit={false}
                  />
              </h1>
              <hr />

              <div className="columns is-multiline">
                <div className="column is-half-desktop">
                  <h1 className="title">Location: {spot.region}, {spot.country}</h1>
                  <br />
                  <SpotMiniMap
                    spot={this.state.spot}
                    />
                </div>
                <div className="column is-half-desktop">
                  <section className="comment-spot">
                    <SpotComments
                      comment={this.state.spot.comment}
                      handleCommentDelete={this.handleCommentDelete}
                      handleCommentSubmit={this.handleCommentSubmit}
                      errors={this.state.errors}
                      commentText={this.state.commentText}
                      commentRating={this.state.commentRating}
                    />
                  </section>
                </div>
              </div>
          </section>
        </div>
      </div>
    )
  }
}

export default SpotShow