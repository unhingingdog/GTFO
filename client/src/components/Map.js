import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

class Map extends Component {

  render() {
    console.log(this.props)

    return(
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{
          lat: this.props.userLocation[0] || 0,
          lng: this.props.userLocation[1] || 0
        }}
      >
        <DrawingManager
          defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.RECTANGLE,
              ],
            },
            circleOptions: {
              fillColor: `#ffff00`,
              fillOpacity: 1,
              strokeWeight: 5,
              clickable: false,
              editable: true,
              zIndex: 1,
            },
          }}
        />
      </GoogleMap>
    )
  }
}


export default withScriptjs(withGoogleMap(Map))



// <Map
//   isMarkerShown
//   googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
//   loadingElement={<div style={{ height: `100%` }} />}
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
//   userLocation={[this.props.currentLatitude, this.props.currentLongitude]}
// />
