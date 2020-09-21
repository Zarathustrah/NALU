import React from 'react'
import { getUser, getAllSpots, addAchievedSpot, deleteAcheivedSpot } from '../../lib/api'
import { isOwner } from '../../lib/auth'

import AddAchievedSpot from './AddAchievedSpot'
import HandleCompletedSpot from './HandleCompletedSpot'

class Profile extends React.Component {
  state= {
    users: null,
    spots: null,
  }

  async componentDidMount() {
    try {
      const res = await getUser(this.props.match.params.id)
      const resSpot = await getAllSpots()
      this.setState({ spots: resSpot.data, users: res.data })
      console.log('spots array', resSpot.data)
      // console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  addAchievedSurfSpot = async (e, spotId ) => {
    e.preventDefault()
    try {
      const userId = this.state.users._id
      // console.log(userId)
      // console.log('state', this.state)
      await addAchievedSpot(userId, spotId)
      const res = await getUser(userId)
      this.setState({ users: res.data })

    } catch (err) {
      console.log(err.response)
    }
  }

  removeCompletedSpot = async (e) => {
    const linkName = e.target.name
    const id = e.target.value

    try {
      const userId = this.state.users._id

      await deleteAcheivedSpot(userId, linkName, id)
      const res = await getUser(userId)
      this.setState({ users: res.data })

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { users, spots } = this.state
    if (!users) return null

    let achievedSurfSpot
    console.log('achievedSurfSpot', achievedSurfSpot)
    console.log('profile, users', users)

    console.log('usersachievedSurfSpot', users.achievedSurfSpot)
    console.log('profile spot',this.state.spots);
    let filteredSpots = [];
    if (spots && users){
      filteredSpots = spots.filter(spot => {
        let isUserSpot = false
        users.achievedSurfSpot.forEach(surfSpotId =>{
          if (surfSpotId.spot === spot._id) {
            isUserSpot = true
          }
        })
        return isUserSpot
      });
    }
      console.log('filteredSpots', filteredSpots)
      if (filteredSpots) {
      if (filteredSpots.length > 0 ) {
        achievedSurfSpot = filteredSpots.map(spot => {
          return <HandleCompletedSpot key={spot._id} {...spot} handleClick={this.removeCompletedSpot} edit={this.state.edit} />
        })
      } else {
        if (isOwner(this.state.users._id)) {
          achievedSurfSpot = <div>Add your surf spots!</div>
        } else { achievedSurfSpot = <div>You've not surfed anywhere... </div> }
      }
    }


    return (
      <section className="section profilebackground">
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
                <button className="button is-primary has-text-centered add-margin">Edit Portfolio</button>
              </div>
            </div>
            <div className="column is-four-fifths personalinfo">
              <div className="column details"></div>
              <div className="details"
                name=""
                value="">
              </div>
              <div className="column details">
                <h1 className="">{users.username}</h1>
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
