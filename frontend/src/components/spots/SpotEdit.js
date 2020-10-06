import React from 'react'
import SpotForm from './SpotForm'

import { showSingleSpot, editSpot } from '../../lib/api'

class SpotEdit extends React.Component {
  state = {
    formData:{
      continent: '',
      region: '',
      country: '',
      lat: 0,
      long: 0,
      spot: '',
      waveType: '',
      difficulty: '',
      season: '',
      image: '',
      description: ''
    }
  }

  async componentDidMount() {
    try {
      const res = await showSingleSpot(this.props.match.params.id)
      this.setState({ formData: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const spotId = this.props.match.params.id
    try {
      const res = await editSpot(spotId, this.state.formData) // <-- this doesn't return anything called form data
      console.log(res.data) // <--  lets see the response
      this.props.history.push(`/surfspots/${spotId}`) // <-- you can just use your spot Id here
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {

    return ( 
    <section className="section">
      <div className="container">
        <SpotForm 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          formData={this.state.formData}
          />
      </div>
    </section>
    )
  }
}

export default SpotEdit