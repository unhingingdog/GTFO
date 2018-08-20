import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import Map from './Map'

export class FlightDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      extraTime: 0
    }
  }

  componentDidMount() {
    const extraTime = (this.props.arriveAtGate || 2376) + 900
    this.setState({ extraTime })
  }

  render() {
    const {
      flight,
      originCity,
      destinationCity,
      departure,
      arriveAtGate,
      checkInAndBagDropClose,
      checkInAndBagDropOpen,
      gateClosed,
      duration
    } = this.props

    const { extraTime } = this.state

    const date = new Date((departure) * 1000).toDateString()

    const departureTime = new Date((departure) * 1000).toTimeString()

    const arriveAtGateTime = new Date((departure - arriveAtGate) * 1000)
      .toTimeString()

    const checkinAndBaggageDropCloseTime =
      new Date((departure - checkInAndBagDropClose) * 1000).toTimeString()

    const checkInAndBaggageOpenTime =
      new Date((departure - checkInAndBagDropOpen) * 1000).toTimeString()

    const gateCloseTime = new Date((departure - gateClosed) * 1000)
      .toTimeString()

    const leaveAt =
      new Date((
        departure -
        duration -
        (this.state.extraTime)
      ) * 1000).toTimeString()

      const sliderMarkers = {
        0: {
          style: {
            color: 'white',
          },
          label: `Departs at ${departureTime.split(':').splice(0,2).join(':')}`
        },
        [gateClosed]: {
          style: {
            color: 'white',
            marginTop: -34
          },
          label: `Gate closes at ${gateCloseTime.split(':').splice(0,2).join(':')}`
        },
        [arriveAtGate]: {
          style: {
            color: 'white'
          },
          label: `Arrive at gate at ${arriveAtGateTime.split(':').splice(0,2).join(':')}`
        },
        [checkInAndBagDropClose]: {
          style: {
            color: 'white',
            marginTop: -34
          },
          label: `Check-in/bag-drop close at ${checkinAndBaggageDropCloseTime.split(':').splice(0,2).join(':')}`
        },
        [checkInAndBagDropClose + 1800]: {
          style: {
            color: 'white'
          },
          label: "extra time"
        }
      }

      const placeHolderSlidermarkers = {
        0: {
          style: {
            color: 'white'
          },
          label: `Departs at ${departureTime.split(':').splice(0,2).join(':')}`
        },
        900: {
          style: {
            color: 'white',
            marginTop: -34
          },
          label: `Gate closes at ${
                    gateCloseTime.split(':').splice(0,2).join(':')
                  }`
        },
        2376: {
          style: {
            color: 'white'
          },
          label: `Arrive at gate at ${
                    arriveAtGateTime.split(':').splice(0,2).join(':')
                  }`
        },
        2700: {
          style: {
            color: 'white',
            marginTop: -34
          },
          label: `Check-in/bag-drop close at
                  ${checkinAndBaggageDropCloseTime
                    .split(':').splice(0,2).join(':')
                  }`
        },
        [2700 + 1800]: {
          style: {
            color: 'white'
          },
          label: "extra time"
        }
    }

    return(
      <div id="flight-details-container">
        <section id="fd-details-and-slider">
          <p id="fd-flight-details">
            {originCity || 'originCity'} to
            {' ' + destinationCity + ' ' || 'destinationCity'} on
            {' ' + date}
            <span id="fd-flight-number">{` (${flight || 'EG123'})`}</span>
          </p>
          <h2 id="fd-leave-at">
            Leave at {leaveAt.split(' ')[0].split(':').splice(0,2).join(':')}
          </h2>
          <p id="fd-mins-before">
            To arrive {Math.floor(extraTime / 60)} minutes before departure
            with a {Math.ceil(duration / 60)} drive to the airport.
          </p>
          <div className="slider-container">
            <Slider
              max={(checkInAndBagDropClose || 2700) + 1800}
              min={0}
              step={60}
              marks={flight ? sliderMarkers : placeHolderSlidermarkers}
              value={extraTime}
              onChange={value => this.setState({ extraTime: value })}
            />
          </div>
        </section>
        <section id="fd-map">
          <Map
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            userLocation={[this.props.currentLatitude, this.props.currentLongitude]}
          />
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    flight: state.flight.flight,
    originCity: state.flight.originCity,
    destinationCity: state.flight.destinationCity,
    departure: state.flight.filedDepartureTime,
    actualDepartureTime: state.flight.actualdeparturetime,
    arriveAtGate: state.flight.arriveAtGate,
    checkInAndBagDropClose: state.flight.checkInAndBagDropClose,
    checkInAndBagDropOpen: state.flight.checkInAndBagDropOpen,
    gateClosed: state.flight.gateClosed,
    distance: state.flight.distance,
    duration: state.flight.duration,
    currentLatitude: state.location.currentLatitude,
    currentLongitude: state.location.currentLongitude,
    currentlyLoading: state.loading.currentlyLoading,
    loadingMessage: state.loading.message,
  }
}

export default connect(mapStateToProps, {})(FlightDetails)
