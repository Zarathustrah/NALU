import React from 'react'
import Profile from './Profile'
import { registerUser } from '../../lib/api'


class ProfileForm extends React.Component {

  state = {
    formData: {
      username: '',
      email: '',
      profileImage: '',
      achievedSurfSpot: ''
    }
  }
  
  async componentDidMount() {
    const userId = this.props.match.params.username
    console.log(userId)
    try {
      const res = await registerUser(userId)
      this.setState({ formData: res.formData })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <section className="section profilepage">
        <div className="container">
          <Profile
            formData={this.state.formData}
            // errors={this.state.errors}
            // handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            submitText="Submit!"
          />
        </div>
      </section>
    )  
  }
}

export default ProfileForm