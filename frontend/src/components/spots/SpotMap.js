import React from 'react'
import MapGl from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { getAllSpots } from '../../lib/api'
import { Popup, NavigationControl } from 'react-map-gl'
import { Link } from 'react-router-dom'


class SpotMap extends React.Component {

  state = {
    surfPoints: [],
    viewport: {
      latitude: 51,
      longitude: 5,
      zoom: 4,
      bearing: 0,
      pitch: 0
    }
  }

  async componentDidMount() {
    try {
      const res = await getAllSpots()
      console.log(res.data)
      this.setState({ surfPoints: res.data})
    } catch (err) {
      console.log(err)
    }
  }

  handlePopupShow = e => {
    if (e.currentTarget.classname === "small-popup") {
      e.currentTarget.className = "large-popup"
    } else {
      e.currentTarget.className = "small-popup"
    }
  }

  render() {
    console.log(this.state.surfPoints)
    const { surfPoints, viewport } = this.state
    return (
      <>
        <h1 className="julien">Fuck off</h1>
        <div className="spotMap box">
          <MapGl
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPTOK}
            height={'100vh'}
            width={'100vw'}
            mapStyle='mapbox://styles/heybt/cke2jh7be0z3j19qnclq6kisx'
            onViewportChange={viewport => this.setState({ viewport })}
            zoom={3}
          >
        {surfPoints.map(point => {
          return (
            <div key={`popup${point._id}`}>
              <Popup
                latitude={point.lat}
                longitude={point.long}
                closeButton={false}
                >
                  <div className="small-popup" onClick={this.handlePopupShow}>
                    <h1>{point.spot}, {point.region}, <span role="img" aria-label="marker">📍</span></h1>
                    <h2>{point.country}, {point.region} </h2>
                    <h3>{point.difficulty}, {point.season}</h3>
                    <div className="popup-image">
                      <img className="index-image" src={point.image} alt={point.name} />
                    </div>
                    <Link to={`/surfspots/${point._id}`}>
                      <p>Explore...</p>
                    </Link>
                  </div>
                </Popup>
            </div>
          )
        })}
        <NavigationControl showZoom position='top-left' className="map-controls" />
          </MapGl>
        </div>
      </>
    )
  }
}



export default SpotMap