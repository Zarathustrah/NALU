import React from 'react'

import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import UserCard from '../users/UserCard'

class SurfersCommunity extends React.Component {
  state = {
    array: null
  }

  handleDrag = (e) => {
    e.preventDefault()
  }

  render() {
    return (
      this.props.type === 'users' ?
      <>
        <AliceCarousel 
          className="carousel-class"
          mouseTrackingEnabled
          responsive={{ 0: { items: 1 }, 1024: { items: 5 } }}
          dotsDisabled
        >
        
          {this.props.type === 'users' && this.props.data.map(user => {
            return <UserCard key={user._id} {...user} />
          })}
        </AliceCarousel> 
        </>
        :
        <AliceCarousel 
          className="carousel-class"
          mouseTrackingEnabled
          responsive={{ 0: { items: 1 }, 1024: { items: 3 } }}
          dotsDisabled
        >
        </AliceCarousel> 
    )
  }
}

export default SurfersCommunity