import React from 'react'
import { getAllSpots } from '../../lib/api'

class Home extends React.Component {
  state = {
      search: ''
    }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  handleSubmit = event => {
    event.preventDefault()
    this.props.history.push(`/surfspots?search=${this.state.search}`)
  }

  render(){
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
          <h1 className="title is-1 frontpage wavy">
            <p>N</p>
            <p>A</p>
            <p>L</p>
            <p>U</p>
          </h1>
          <div className="field is-grouped search">
            <form onSubmit={this.handleSubmit}>
            <p className="control is-expanded">
            <input 
              className="input is-rounded is-primary" 
              type="text" 
              placeholder="Enter a Destination"
              name="search" 
              onChange={this.handleChange}
              value={this.state.search}
            />
            </p>
            <p className="control">
            <button className="button is-rounded is-primary swimmer">
            <span className="icon"> Search
            </span>
            </button>
            </p>
            </form>
          </div>
          </div>  
        </div>
      </section >
  )
}
}
export default Home