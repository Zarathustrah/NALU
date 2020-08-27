import React from 'react'
import { createSpot } from '../../lib/api'
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
  }
}

handleChange = ( event ) => {
  const formData = { ...this.state.formData, [event.target.name]: event.target.value }
  this.setState({ formData })
  console.log(this.state)
}

handleSubmit = async event => {
  event.preventDefault()
  try {
    const res = await createSpot(this.state.formData)
    this.props.history.push(`/surfspots/${res.data._id}`)
  } catch (err) {
    console.log(err.response.data)
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
export default SpotNew