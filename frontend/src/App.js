import React from 'react'
import axios from 'axios'

class App extends React.Component {
  async componentDidMount() {
    try {
      const res = await axios.get('/api/surfspots')
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  } 

render() {
  return <h1>Nalu here we are</h1>
  }
}


export default App
