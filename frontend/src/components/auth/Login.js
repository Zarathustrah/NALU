import React from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import { popupNotification } from '../../lib/notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
// import HeroBanner from '../common/HeroBanner'


class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await loginUser(this.state.data)
      console.log(res.data)
      setToken(res.data.token)
      popupNotification(res.data.message)
      this.props.history.push('/surfspots')
    } catch (err) {
      console.log(err)
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  render() {
    return (
      <>
        <section className="hero is-fullheight login">
        <section className="section">
          <div className="container">
          <h1 className="signup">Welcome Back</h1>
            <div className="columns">
              <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input
                      className={`input ${this.state.error ? 'is-danger' : ''}`}
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faEnvelope}/>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      className={`input ${this.state.error ? 'is-danger' : ''}`}
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                  {this.state.error && <small className="help is-primary">{this.state.error}</small>}
                </div>
                <button type="submit" className="button is-dark is-fullwidth">Login</button>
                <div className="column is-half is-offset-one-quarter">
                  <p className="has-text-centered">
                    <small>Dont have an account?
                      <Link to="/register" className="form-link"> Sign Up</Link>
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

export default Login
