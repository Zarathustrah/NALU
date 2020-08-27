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
    const userId = this.props.match.params.id
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


let completedSurfSpots
if (profile.completedHikes) {
  if (profile.completedHikes.length > 0) {
    completedHikes = profile.completedHikes.map(hike => {
      return <ProfileComplete key={hike._id} {...hike} handleClick={this.removeHike} edit={this.state.edit} />
    })
  } else {
    if (isOwner(this.state.profile._id)) {
      completedHikes = <div>No new hikes yet. Add a new one below...</div>
    } else { completedHikes = <div> No completed hikes added</div> }
  }
}