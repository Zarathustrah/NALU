import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import { getToken } from '../../lib/auth'
import SpotIndex from '../spots/SpotIndex'
class AddAchievedSpot extends React.Component {
  state = {
    spots: null,
    spotOptions: null,
    achievedSpot: null,
    selectedSpot: ''
  }
  async componentDidMount() {
    try {
      const withHeaders = () => {
        return {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      }
      const baseUrl = '/api'
      const res = await axios.get(`${baseUrl}/surfspots`)
      const resUser = await axios.get(`${baseUrl}/profile/${this.props.id}`, withHeaders())
      console.log(resUser)
      this.setState({ spots: res.data, achievedSpot: resUser.data.achievedSpot },
        () => {
          this.addSpotOptions()
        })
    } catch (err) {
      console.log(err)
    }
  }
  addSpotOptions = () => {
    const { spots } = this.state
    console.log('addSpotOptionFunction', spots)
    const spotOptions = spots.map(spot => ({ value: spot._id, label: spot.spot }))
    this.setState({ spotOptions })
  }
  handleMultiChange = async (selected) => {
    const selectedSpot = selected ? { spot: selected.value } : ''
    this.setState({ selectedSpot })
  }
  render() {
    console.log(this.state.spotOptions)
    console.log(this.state.selectedSpot)
    console.log(this.state.spots)
    return (
      <div>
        <form onSubmit={(event) => this.props.handleSubmit(event, this.state.selectedSpot)} className="columns comp-form" >
          <Select
            className="column is-four-fifths"
            placeholder="Where have you surfed?"
            options={this.state.spotOptions}
            onChange={this.handleMultiChange}
          />
          <div className="column"> 
            <button type="submit" className="button">+</button>
          </div>
        </form>
      </div >
    )
  }
}
export default AddAchievedSpot