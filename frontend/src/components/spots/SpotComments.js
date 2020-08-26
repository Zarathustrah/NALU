import React from 'react'
import Moment from 'react-moment'
import 'moment-timezone'
import ReactStars from "react-rating-stars-component"

import { isOwner, getUserId, isAuthenticated } from '../../lib/auth'
import { getUser } from '../../lib/api'

class SpotComments extends React.Component {
  state = {
    commentData: '',
    rating: '',
    userProfileImage: '',
    // createdDate: ''
  }

  async componentDidMount() {
    try {
      const currentUserId = getUserId()
      const loggedIn = await isAuthenticated()
      if (!loggedIn) {
        this.setState({ userProfileImage: '' })
      } else {
        const res = await getUser(currentUserId)
        console.log(res.data.profileImage)
        this.setState({ userProfileImage: res.data.profileImage })
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = e => {
    const commentData = e.target.value
    console.log(e.target.value)
    this.setState({ commentData })
  }

  handleRating = rating => {
    this.setState({ rating })
  }

  handleSubmit = (e, rating, text) => {
    this.props.handleCommentSubmit(e, rating, text)
    this.setState({ rating: this.props.commentRating, commentData: this.props.commentText })
  }


  render() {
    const { handleCommentDelete, comment, errors} = this.props
    const { commentData, rating, userProfileImage } = this.state

    return (
      <>
        {isAuthenticated() &&
          <form onSubmit={(event) => { this.handleSubmit(event, this.state.rating, this.state.commentData) }}>
            <h1 className="nalu-title">Add Review:</h1>
            <br />
            <article className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={userProfileImage} alt="User Img" />
                </p>
              </figure>
              <div className="media-content">
                <div className="field">
                  <p className="control">
                    <textarea
                      className="textarea"
                      placeholder="Add a comment..."
                      name="text"
                      onChange={this.handleChange}
                      value={commentData}
                    >
                    </textarea>
                  </p>
                  {errors && !errors.text && <small className="help is-danger">Comment is required</small>}
                </div>
                {errors && !errors.rating && <small className="help is-danger">Rating is required</small>}

                <div className="level">
                  <div className="level-left">
                    <div className="control">
                      <label>Rating: </label>
                      <ReactStars
                        count={5}
                        size={20}
                        half={false}
                        name="rating"
                        value={parseInt(rating)}
                        onChange={calcRating => {
                          this.handleRating(calcRating)
                        }}
                        filledIcon={<i className="fas fa-star" />}
                        emptyIcon={<i className="fas fa-star" />}
                      />
                    </div>
                  </div>
                </div>
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <button type="submit" className="button spot-button-active is-success">Submit Comment!</button>
                    </div>
                  </div>
                </nav>
                <hr />
              </div>
            </article>
          </form>}
        <article className="media">
          <h1 className="nalu-title">N A L U Comments:</h1>
        </article>
        {comment.map(comment => {
          console.log(comment.user.profileImage)
          return (
            <article key={comment._id} className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={comment.user.profileImage} alt="User Img" />
                </p>
              </figure>
              <div className="media-content">
                  <div>
                    <strong>{comment.user.username}</strong> <small><Moment fromNow >{comment.createdAt}</Moment></small>
                    <ReactStars
                      count={5}
                      size={12}
                      half={false}
                      value={comment.rating}
                      filledIcon={<i className="fas fa-star" />}
                      emptyIcon={<i className="fas fa-star" />}
                      edit={false}
                    />
                    <br />
                    {comment.text} 
                  </div>
                </div>
              <div className="media-right">
                <form onSubmit={handleCommentDelete} id={comment._id}>
                  {isOwner(comment.user._id) && <button type="submit" className="delete"></button>}
                </form>
              </div>
            </article>
          )
        })}
      </>
    )
  }
}

export default SpotComments
