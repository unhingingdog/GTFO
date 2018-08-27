/*global google*/
import React, { Component } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps"

class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      directions: null
    }
  }

  componentDidMount() {
    const { userLocation } = this.props
    const DirectionsService = new google.maps.DirectionsService()

    DirectionsService.route({
        origin: new google.maps.LatLng(userLocation[0], userLocation[1]),
        destination: this.props.airportName + 'airport',
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      })
  }

  render() {
    const { userLocation } = this.props
    return(
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{
          lat: userLocation[0] || 0,
          lng: userLocation[1] || 0
        }}
      >
      {this.state.directions &&
        <DirectionsRenderer directions={this.state.directions} />
      }
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(Map))
