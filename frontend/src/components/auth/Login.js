import React from 'react'

class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    }
  }
  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: false })
  }
  handleSubmit = event => {
    event.preventDefault()

    console.log('Submit the form', this.state.formData)
  }
 
  render() {
    return(
      <section className="section">
      <div className="container">
        <div className="columns">
          <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : '' }`}
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.formData.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className={`input ${this.state.error ? 'is-danger' : ''}`}
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.formData.password}
                />
              </div>
            </div>
            {this.state.error && <small className="help is-danger">Sorry, your credentials were incorrect</small>}
            <div className="field">
              <button
                disabled={!this.state.formData.email || !this.state.formData.password}
                type="submit"
                className="button is-fullwidth is-warning">
                    Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
   )
  }
}
export default Login