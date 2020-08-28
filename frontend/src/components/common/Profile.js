import React from 'react'
import { getUser, addAchievedSpot } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import AddAchievedSpot from './AddAchievedSpot'
import HandleCompletedSpot from './HandleCompletedSpot'
class Profile extends React.Component {
  state= {
    users: null,
    edit: false
  }
  async componentDidMount() {
    try {
      const res = await getUser(this.props.match.params.id)
      this.setState({ users: res.data })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  addAchievedSurfSpot = async (e, chosenSpot ) => {
    e.preventDefault()
    try {
      const userId = this.state.users._id
      console.log(userId)
      console.log('state', this.state)
      await addAchievedSpot(userId, chosenSpot)
      const res = await getUser(userId)
      this.setState({ users: res.data })
    } catch (err) {
      console.log(err.response)
    }
  }
  enableEdit = () => {
    const editTerm = this.state.editTerm === 'Edit' ? 'Close edit' : 'Edit'
    this.setState({ edit: !this.state.edit, editTerm })
  }
  render() {
    const { users } = this.state
    if (!users) return null
    let achievedSurfSpot
    if (users.achievedSurfSpot) {
      if (users.achievedSurfSpot.length > 0 ) {
        achievedSurfSpot = users.achievedSurfSpot.map(spot => {
          return <HandleCompletedSpot key={spot._id} {...spot} handleClick={this.removeSpot} edit={this.state.edit} />
        })
      } else {
        if (isOwner(this.state.users._id)) {
          achievedSurfSpot = <div>Add your surf spots!</div>
        } else { achievedSurfSpot = <div>You've not surfed anywhere... </div> }
      }
    }
    return (
      <section className="section">
        <h1 className="title is-3 heading">My Profile</h1>
        <div className="columns is-two-fifths">
          <div className="columns is-two-fifths">
            <div className="container picture">
              <div className="pic">
                <figure className="image is-128x128">
                  <img className="is-rounded"
                    name="profileImage"
                    value=""
                    alt="user-img"
                    src={users.profileImage}
                  />
                </figure>
              </div>
              <div className="has-text-centered add-margin">
                <button className="has-text-centered add-margin">Edit Portfolio</button>
              </div>
            </div>
            <div className="column is-four-fifths personalinfo">
              <div className="column details"></div>
              <div className="details"
                name=""
                value="">
              </div>
              <div className="column details">
                <h1>{users.username}</h1>
              </div>
              <hr className="seperator" />
              <div className="column details">
              <h1>{users.email}</h1>
              </div>
              <hr className="seperator" />
              <div className="column details">
              {/* <h1>{users.}</h1> */}
              </div>
            </div>
          </div>
        </div>
        <div className="tile is-parent tile is-6">
          <div className="tile is child box">
            <div className="columns is multiline ">
              <article className="column is-full">
                <h1 className="subtitle">Wish List</h1>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  name="visited"
                // onChange={handleChange}
                // value={this.visited}
                />
              </article>
            </div>
          </div>
        </div>
        <div className="tile is-parent tile is-6">
          <div className="tile is child box">
            <div className="columns is multiline">
              <article className="column is-full">
                <h1 className="subtitle">Places Surfed</h1>
                <input
                  className="input"
                  type="text"
                  placeholder=""
                  name="visited"
                />
                <div className="column columns is-multiline">
                  {isOwner(users._id) &&
                    <div className="column is-full"> 
                      <AddAchievedSpot 
                        id={users._id} 
                        handleSubmit={this.addAchievedSurfSpot} 
                      />
                    </div>
                  }
                  <div className="completed">{achievedSurfSpot}</div>
                  </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default Profile