import React from 'react'
import axios from 'axios'
import { getAllSpots } from '../../lib/api'
import { getToken } from '../../lib/auth'


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
      const resUser = await axios.get(`${baseUrl}/profile/${this.props.userId}`, withHeaders())
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
    const spotOptions = spots.map(spot => ({ value: }))
  }

  render() {
    const { achievedSpot } = this.state
    console.log(achievedSpot)
    return (
      <h1>FUCK YOU. I FUCKING HATE YOU</h1>
    )
  }
}

export default AddAchievedSpot