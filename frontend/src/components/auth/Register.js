import React from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../../lib/api'
import { popupNotification } from '../../lib/notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
// import HeroBanner from '../common/HeroBanner'

class Register extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  }
  
  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await registerUser(this.state.data)
      console.log(res.data)
      console.log(res)
      popupNotification('Welcome! now please log in')
      this.props.history.push('/login')
    } catch (err) {
      console.log(this.state)
      console.log(err)
      this.setState({ errors: err.response.data.errors })
    }
  }
  render() {
    console.log(this.state.data)
    return (
      <>
        <section className="hero is-fullheight banner">
        <section className="section is-large">
          <div className="container">
          <h1 className="register">Join The Crew</h1>
            <div className="columns">
              <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box change" >
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left">
                    <input
                      className={`input ${this.state.errors.username ? 'is-danger' : ''}`}
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input
                      className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                  {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                  {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
                </div>
                <div className="field">
                  <label className="label">Password Confirmation</label>
                  <div className="control has-icons-left">
                    <input
                      className={`input ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
                      type="password"
                      placeholder="Password Confirmation"
                      name="passwordConfirmation"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                  {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
                </div>
                <div className="field">
                  <button type="submit" className="button is-fullwidth is-primary">Register Me</button>
                </div>
                <div className="column is-half is-offset-one-quarter">
                  <p className="has-text-centered">
                    <small>Already have an account?
                      <Link to="/login" className="form-link">Log In</Link>
                    </small>
                  </p>
                </div>
              </form>
            </div>
          </div>
      </section>
      </section>
      </>
    )
  }
}

export default Register
