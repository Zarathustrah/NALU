import React from 'react'
import MapGL, { Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

class SpotMiniMap extends React.Component {
  render() {
    const spot = this.props.spot
    return (
      <div className="spot-show-minimap">
        <MapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPTOK}
          width="50vh"
          height="50vh"
          mapStyle="mapbox://styles/heybt/cke9wjydl4lb719p30xbp38b3"
          latitude={spot.lat}
          longitude={spot.long}
          zoom={12}
          >

            <div>
              <Popup
              latitude={spot.lat}
              longitude={spot.long}
              closeButton={false}
              >
                <h1 className="popup-text">{spot.region}, {spot.country}<span role="img" aria-label="marker">📍</span></h1>
              </Popup>
            </div>

          </MapGL>
      </div>
    )
  }
}

export default SpotMiniMap
