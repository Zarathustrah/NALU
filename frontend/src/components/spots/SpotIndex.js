import React from 'react'
// import { getAllSpots } from '../../lib/api'
import axios from 'axios'

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
  render() {
    console.log(this.state)
    return <h1>Spots Index Page</h1>
  }
}
export default SpotIndex