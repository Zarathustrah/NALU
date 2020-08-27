import React from 'react'

const ProfileForm = ({ formData }) => {
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
                  alt="pic"
                  src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg"
                />
              </figure>
            </div>
            <div className="has-text-centered add-margin">
              <button className="has-text-centered add-margin">Edit Portfolio</button>
            </div>
          </div>
          <div className="column is-four-fifths personalinfo">
            <div className="column details">Name</div>
            <div className="details"
              name=""
              value="">
            </div>
            <hr className="seperator" />
            <div className="column details">Email </div>
            <hr className="seperator" />
            <div className="column details">Experience Level</div>
            <hr className="seperator" />
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
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ProfileForm