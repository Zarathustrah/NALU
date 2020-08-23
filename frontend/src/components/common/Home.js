import React from 'react'

const Home = () => {
  return (

    <section className='hero is-fullheight'>
      <div className="hero-body">     
	        <div className="container">
          <h1 className='title'>Nalu</h1>
          <div className="field is-grouped">
            <p className="control is-expanded">
              <input className="input"  type="text" placeholder="Find a repository"/>
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