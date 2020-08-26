import React from 'react'
import { createSpot } from '../../lib/api'
import { popupNotification } from '../../lib/notification'

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
    errors: {}
}

handleChange = ( e ) => {
  const formData = { ...this.state.formData, [e.target.name]: e.target.value }
  const errors = { ...this.state.errors, [e.target.name]: '' }
  this.setState({ formData, errors })
}

handleSubmit = async e => {
  e.preventDefault()

  try {
    const res = await createSpot(this.state.formData)
    console.log(res)
    popupNotification('Surf Spot Added')
    this.props.history.push(`/surfspots/${res.data._id}`)
  } catch (err) {
    console.log(err)
    this.setState({ errors: err.response.data.errors })
  }
}

  render() {
      const { formData } = this.state
      console.log(formData)
      return(
    <main className="section backgoundImage">
      <h1 className="spotHeading">Surf Spot</h1>
      <div className="columns is-mobile">
        <div className="column is-4-tablet is-offset-4-tablet is-8-mobile is-offset-2-mobile box boxcolor">
          <div className="control list">
          <div className="field">
          <h3>Continent</h3>
          <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select name="continent"  onChange={this.handleChange} value={formData.value}>
            <option disabled value="">-</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
            </select>
            </div>
          </div>
          </div>
          <div className="field is-grouped">
            <p className="control is-expanded">
            <input className="input user" type="text" placeholder="region" name="region" value={formData.region}
                  onChange={this.handleChange} />
              </p>
              <p className="control">
              </p>
              </div>

            <div className="field is-grouped">
              <p className="control is-expanded">
              <input className="input user" type="text" placeholder="Country" name="country"  value={formData.country} onChange={this.handleChange}/>
              </p>
              <p className="control">
              </p>
              </div>

            <div className="field is-grouped">
              <p className="control is-expanded">
              <input className="input user" type="text" placeholder="Latitude" name="lat" value={formData.lat} onChange={this.handleChange}/>
              </p>
              <p className="control">
              </p>
              </div>
              <div className="field is-grouped">
              <p className="control is-expanded">
              <input className="input user" type="text" placeholder="Longtitude" name="long" value= {formData.long} onChange={this.handleChange}/>
              </p>
              <p className="control">
              </p>
              </div>
              <div className="field is-grouped">
              <p className="control is-expanded">
              <input className="input user" type="text" placeholder="Surf Spot"  name="spot" value={formData.spot} onChange={this.handleChange}/>
              </p>
              <p className="control">
              </p>
              </div>
              <div className="field">
              <h3>Wave Types</h3>
          <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select name="waveType" onChange={this.handleChange} value={formData.value} defaultValue="">
            <option disabled value="">-</option>
            <option value="Beach Breaks">Beach Breaks</option>
            <option value="Reef Breaks">Reef Breaks</option>
            <option value="Point breaks">Point breaks</option>
            <option value="Rivermouth Waves">Rivermouth Waves</option>
            <option value="Reform Waves">Reform Waves</option>
            <option value="Crumbly Waves">Crumbly Waves</option>
            <option value="Double-up Waves">Double-up Waves</option>
            </select>
            </div>
          </div>
          </div> 

          <div className="field">
          <h3>Difficulty</h3>
          <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select name="difficulty" onChange={this.handleChange} value={formData.value} defaultValue="">
            <option disabled value="">-</option>
            <option value="difficulty">LevelAll </option>
            <option value="difficulty">Beginner</option>
            <option value="difficulty">Intermediate</option>
            <option value="difficulty">Advanced</option>
            </select>
            </div>
          </div>
          </div> 

          <div className="field">
          <h3>Season</h3>
          <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select name="season" onChange={this.handleChange} value={formData.value} defaultValue="">
            <option disabled value="">-</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="Autumn">Autumn</option>
            <option value="Spring">Spring</option>
            </select>
            </div>
          </div>
          </div> 

          <h3>Add an Image URL</h3>
          <div className="field is-grouped">
            <p className="control is-expanded">
            <input className="input user" type="text" placeholder="Image Url" name="image" value={formData.image} onChange={this.handleChange}/>
              </p>
              <p className="control">
              </p>
              </div>
            <h3>Add an Description</h3>
            <div className="field">
            <div className="control">
              <textarea className="textarea" placeholder="Description"  name="description"
                  value={formData.description}
                  onChange={this.handleChange}></textarea>
              <button type = "submit" className="button is-info has-addons is-right sendoff" handleSubmit={this.handleSubmit} formData={this.state.formData}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
      )
  }
}

export default SpotNew