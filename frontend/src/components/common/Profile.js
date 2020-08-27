import React from 'react'
import ProfileForm from './ProfileForm'
import { registerUser } from '../../lib/api'


class Profile extends React.Component {

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

  render(){
  
    return (
      <section className="section profilepage">
        <div className="container">
          <ProfileForm
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

export default Profile