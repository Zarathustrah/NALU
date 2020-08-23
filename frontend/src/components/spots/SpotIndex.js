import React from'react'
import axios from 'axios'
//import { getAllSpots } from '../../lib/api'


class SpotIndex extends React.Component {
  state = { spots: [] }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/surfspots')
      //const res = await getAllSpots
      this.setState({ spots: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.state)
    return <h1>Spots Index Page</h1>
  }

}


export default SpotIndex