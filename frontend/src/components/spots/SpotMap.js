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
      this.setState({ surfPoints: res.data})
    } catch (err) {
      console.log(err)
    }
  }

  handlePopupShow = e => {
    if (e.currentTarget.className === "text-popup") {
      e.currentTarget.className = "card-popup"
    } else {
      e.currentTarget.className = "text-popup"
    } 
  }

  render() {
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
            mapStyle="mapbox://styles/heybt/cke9wjydl4lb719p30xbp38b3"
            onViewportChange={viewport => this.setState({ viewport })}
            zoom={viewport.zoom}
            scrollZoom={false}
          >
        {surfPoints.map(point => {
          return (
            <div key={`popup${point._id}`}>
              <Popup
                latitude={point.lat}
                longitude={point.long}
                closeButton={false}
                >
                  <div className="text-popup" onClick={this.handlePopupShow}>
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
        <NavigationControl showZoom={true} showCompass={true} position="top-left" className="map-controls" />
          </MapGl>
        </div>
      </>
    )
  }
}



export default SpotMap