import React from 'react'

class Home extends React.Component {
  state = {
    searchTerm: ''
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.history.push(`/surfspots?searchQuery=${this.state.searchTerm}`)
  }

  render() {
    return (
      <section className='hero is-fullheight'>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">N A L U</h1>
            <div className="field is-grouped">
              <p className="control is-expanded">
              {/* <input className="input is-rounded" type="text" placeholder="Enter a Destination" />
              </p>
              <p className="control">
                <button className="button is-info">
                  Search
                </button> */}
                <form
                onSubmit={this.handleSubmit}
                className="column is-half is-offset-one-quarter search-section">
                <div className="field searchbar">
                  <div className="control">
                    <input
                      className="input is-rounded is-primary"
                      type="text"
                      name="searchTerm"
                      placeholder="Search a destination"
                      onChange={this.handleChange}
                      value={this.state.searchTerm}
                    />
                  </div>
                </div>
                <div className="field search-button">
                  <input type="submit" className="button is-rounded is-primary" value="Go!"/>
                </div>
              </form>
              </p>
            </div>
          </div>
        </div>
      </section >
    )
  }
}
  

export default Home