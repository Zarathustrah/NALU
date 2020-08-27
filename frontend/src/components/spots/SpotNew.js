import React from 'react'
import { createSpot } from '../../lib/api'
import { popupNotification } from '../../lib/notification'
import SpotForm from './SpotForm'

class SpotNew extends React.Component {
  state = {
    formData:{
      continent: '',
      region: '',
      country: '',
      lat: '',
      long: '',
      spot: '',
      waveType: '',
      difficulty: '',
      season: '',
      image: '',
      description: ''
    },
    error: {}
  }
  
  handleChange = ( e ) => {
  const formData = { ...this.state.formData, [e.target.name]: e.target.value }
  const errors = { ...this.state.errors, [e.target.name]: '' }
  this.setState({ formData, errors })
  }

  handleSubmit = async e => {
  console.log('clicked', e)
  e.preventDefault()
    
    try {
    const res = await createSpot(this.state.formData)
    console.log(res)
    popupNotification('Surf Spot Added')
    this.props.history.push(`/surfspots/${res.data._id}`)
    console.log("surf spot added")
    } catch (err) {
    console.log(err)
    this.setState({ errors: err.response.data.errors })
    }
  }

    render() {
  return (
    <section className="section backgoundImage">
      <div className="container">
        <SpotForm
          formData={this.state.formData}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          submitText="Submit!"
        />
      </div>
    </section>
  )
}
}

  

export default SpotNew