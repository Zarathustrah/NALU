import React from 'react'
// import { getAllSpots } from '../../lib/api'
import axios from 'axios'

import SpotCard from './SpotCard'

class SpotIndex extends React.Component {
  state = { 
    spots: null,
    search: '',
    hideMap: true,
    hideList: true,
    hideGrid: false  
  }
  
  async componentDidMount() {
    try {
      const res = await axios.get('/api/surfspots')
      // const res = await getAllSpots()
      this.setState({ spots: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleSearch = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  filteredSpots = () => {
    const { spots, search } = this.state
    const searchBar = new RegExp(search, 'i')
    spots.filter(spot => {
      return searchBar.test(spot.country) || searchBar.test(spot.continent) || searchBar.test(spot.spot) || searchBar.test(spot.difficulty) || searchBar.test(spot.season) || searchBar.test(spot.waveType)
    })
  }

  handleDisplayCard = e => {
    e.preventDefault()
    if (e.currentTarget.name === 'showList') {
      this.setState({ hideMap: true, hideList: false, hideGrid: true })
    } else if (e.currentTarget.name === 'showGrid') {
      this.setState({ hideMap: true, hideList: true, hideGrid: false })
    } else {
      this.setState({ hideMap: false, hideList: true, hideGrid: true })
    }
  }

  render() {
    if (!this.state.spots) return null

    return (
      <div className="spotsCollection">
        <div className="hero is-medium">
          <div className="hero-body ">
            <h1 className="title-logo has-text-centered">N A L U</h1>
          </div>
        </div>
        <div className="field box index-search">
          <div className="control index-search-bar">
            <input className="input is-primary is-rounded"
              name="search"
              type="text"
              placeholder="Type the surf spots? Country? Continent? Difficulty? Wave Type or Season..."
              onChange={this.handleSearch}
            />
          </div>
        </div>
        
        <div className="view-change buttons field has-addons">
          <p className="control list-view-button">
            <button
              className="button"
              name="showList"
              onClick={this.handleDisplayCard}>
              <span className="icon is-small">
                <i className="fas fa-list"></i>
              </span>
            </button>
          </p>
          <p className="control">
            <button
              className="button"
              name="showGrid"
              onClick={this.handleDisplayCard}>
              <span className="icon is-small">
                <i className="fas fa-th"></i>
              </span>
            </button>
          </p>
          <p className="control">
            <button
              className="button"
              name="showMap"
              onClick={this.handleDisplayCard}>
              <span className="icon is-small">
                <i className="fas fa-map-pin"></i>
              </span>
            </button>
          </p>
        </div>

        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {this.state.spots.map(spot => (
                <SpotCard key={spot._id} {...spot}/>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default SpotIndex