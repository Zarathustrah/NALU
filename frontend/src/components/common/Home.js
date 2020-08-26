import React from 'react'
const Home = () => {
  return (
    <section className='hero is-fullheight'>
      <div className="hero-body">
        <div className="container">
          <h1 className="title">N A L U</h1>
          <div className="field is-grouped">
            <p className="control is-expanded">
            <input className="input is-rounded" type="text" placeholder="Enter a Destination" />
            </p>
            <p className="control">
              <button className="button is-info">
                Search
              </button>
            </p>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Home