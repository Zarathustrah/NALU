import React from 'react'

const HeroBanner = ({ text }) => {
  return (
    <section className="hero is-small-mobile">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">{text}</h1>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner