import React from 'react'
import ReactStars from 'react-rating-stars-component'

import SpotMiniMap from './SpotMiniMap'
import SpotComments from './SpotComments'

import { showSingleSpot, deleteSpot, commentSpot, deleteSpotComment, getUser, getLocalWeatherStatus, 
  // getMarineWeatherStatus 
} from '../../lib/api'
import { isAuthenticated, isOwner, getUserId } from '../../lib/auth'

class SpotShow extends React.Component {
  state = {
    spot: null,
    errors: '',
    averageRating: null,
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
      console.log(res.data)

      const resWeather = await getLocalWeatherStatus(res.data.lat, res.data.long)
      console.log(resWeather.data)
      this.setState({ localWeather: resWeather.data })

      // const resMarine = await getMarineWeatherStatus(res.data.lat, res.data.long)
      // console.log(resMarine.data)
      // this.setState({ localMarineWeather: resMarine.data })

      if (!loggedIn) {
        this.setState({ spot: res.data, user: '' }, () => {this.handleRating()})
        // this.setState({ spot: res.data, user: '' })
      } else {
        const currentUserId = await getUserId()
        const currentUser = await getUser(currentUserId)
        console.log(res.data)
        this.setState({ spot: res.data, user: currentUser.data }, () => {
          this.handleRating()
          this.getApi(res.data.lat, res.data.long)
          },
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  // withMarineHeaders = () => {
  //   return {
  //     headers: { Authorization: process.env.REACT_APP_STORM }
  //   }
  // }

  getApi(lat, long) {
    console.log('Lat: ' + lat, 'Long: ' + long)
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

      this.setState({ spot: res.data, errors: '', commentText: '', commentRating: '' }, () => {this.handleRating()})

    } catch (err) {
      this.setState({ errors: JSON.parse(err.response.config.data)})
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
    console.log(averageRating)
    this.setState({ averageRating })
  }


  render() {

    if (!this.state.spot) return null
    const { spot, averageRating, localMarineWeather, localWeather } = this.state
    console.log(averageRating)


    console.log(localWeather)
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
                emptyIcon={<i className="far fa-star"></i>}s
                fullIcon={<i className="fa fa-star"></i>}
                // activeColor="#ffd700"
                edit={false}
            />
            </h1>
          </section>
          <section className="column is-one-third local-weather">
            <section className="column is-one-third local-weather">
            <h1>Local Weather</h1>
            <h1>{localWeather.weather[0].main}</h1>
            <img src={`http://openweathermap.org/img/wn/${localWeather.weather[0].icon}@2x.png`} alt="weather-icon" />
            <h1>{(localWeather.main.temp - 273.15).toFixed(0)} °C</h1>
            </section>
          </section>
          {/* <section className="column is-one-third marine-weather">
            <h1>Marine Weather:</h1>
            <h1>Sea Level: {localMarineWeather.hours[0].seaLevel.meto} Tidal</h1>
            <h1>Swell Direction: {localMarineWeather.hours[0].swellDirection.meteo}</h1>
            <h1>Swell Height: {localMarineWeather.hours[0].swellHeight.meteo} SH</h1>
            <h1>Water Temp: {localMarineWeather.hours[0].waterTemperature.meto}°C</h1>
            <h1>Wave Height: {localMarineWeather.hours[0].waveHeight.meteo} WH</h1>
          </section>  */}
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