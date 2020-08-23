import React from 'react'
import { registerUser } from '../../lib/api' 

class Register extends React.Component{
  state = {
    formData: {
      username:'',
      email: '',
      password:'',
      passwordConfirmation: ''
    },
    errors: {}
  }
  

  handleChange = event => {
    const formData = {...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: ''}
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()

    try{
      await registerUser(this.state.formData)
    } catch(err) {
     this.setState({ errors: err.response.data.errors })
  }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.username ? 'is-danger' : '' }`}
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    value={this.state.formData.username}
                  />
                </div>
                {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.formData.email}
                  />
                </div>
                {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.formData.password}
                  />
                </div>
                {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
                    placeholder="Password Confirmation"
                    type="password"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                    value={this.state.formData.passwordConfirmation}
                  />
                </div>
                {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
              </div>
              <div className="field">
                <button
                  type="submit"
                  className="button is-fullwidth is-warning"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Register