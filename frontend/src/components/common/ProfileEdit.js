import React from 'react'
import ProfileForm from './ProfileForm'
import { registerUser } from '../../lib/api'

class ProfileEdit extends React.Component {

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
    try {
      const res = await registerUser(userId)
      this.setState({ formData: res.data })
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    return (
      <h1>hi</h1>
    )  
  }
  }

  export default ProfileEdit