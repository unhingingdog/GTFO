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

    const flightDate = new Date((departure) * 1000).toDateString().trim()

    const departureTime = new Date((departure) * 1000).toTimeString().trim()

    const arriveAtGateTime = new Date((departure - arriveAtGate) * 1000)
      .toTimeString().trim()

    const checkinAndBaggageDropCloseTime =
      new Date((departure - checkInAndBagDropClose) * 1000).toTimeString().trim()

    const checkInAndBaggageOpenTime =
      new Date((departure - checkInAndBagDropOpen) * 1000).toTimeString().trim()

    const gateCloseTime = new Date((departure - gateClosed) * 1000)
      .toTimeString().trim()

    const leaveAt =
      new Date((
        departure -
        duration -
        (this.state.extraTime)
      ) * 1000).toTimeString()

      const mobileStyle = {
        topLabel: {
          position: 'absolute',
          color: 'white',
          transform: 'rotate(45deg)',
          textAlign: 'left',
          top: 58,
          padding: 0,
          marginLeft: -15,
          width: 180

        },
        bottomLabel: {
          position: 'absolute',
          color: 'white',
          transform: 'rotate(45deg)',
          textAlign: 'left',
          top: 58,
          padding: 0,
          marginLeft: -15,
          width: 180
        },
        handle: { width: 23, height: 23, top: -0.5 },
        dot: { width: 15, height: 15, top: -5 }
      }

      const desktopStyle = {
        topLabel: { color: 'white', top: -42, },
        bottomLabel: { color: 'white', bottom: -20 },
        handle: { width: 20, height: 20, top: 1 },
        dot: { width: 12, height: 12, top: -4 }
      }

      const isMobile = window.innerWidth < 800
      const viewMode = isMobile ? mobileStyle : desktopStyle

      const sliderMarkers = {
        0: {
          style: viewMode.bottomLabel,
          label: `Departs at ${departureTime.split(':').splice(0,2).join(':')}`
        },
        [gateClosed]: {
          style: viewMode.topLabel,
          label: `Gate closes at
            ${gateCloseTime.split(':').splice(0,2).join(':')}`
        },
        [arriveAtGate]: {
          style: viewMode.bottomLabel,
          label: `Arrive at gate
            ${arriveAtGateTime.split(':').splice(0,2).join(':')}`
        },
        [checkInAndBagDropClose]: {
          style: viewMode.topLabel,
          label: `Check-in/bag-drop close at
            ${checkinAndBaggageDropCloseTime.split(':').splice(0,2).join(':')}`
        },
      }

      const placeHolderSlidermarkers = {
        0: {
          style: viewMode.bottomLabel,
          label: `Departs (1:00)`
        },
        900: {
          style: viewMode.topLabel,
          label: `Gate closes (12:30)`
        },
        2376: {
          style: viewMode.bottomLabel,
          label: `Arrive at gate (12:00)`
        },
        2700: {
          style: viewMode.topLabel,
          label: `Check-in/bag-drop close (11:55)`
        }
    }

    return(
      <div id="flight-details-container">
        <section id="fd-details-and-slider">
          <p id="fd-flight-details">
            {(originCity || 'originCity')} to {destinationCity || 'destinationCity'} on {flightDate}
          </p>
          <h2 id="fd-leave-at">
            {`Leave at ${leaveAt.split(' ')[0].split(':').splice(0,2).join(':')}`}
          </h2>
          <div id="fd-mins-before">
            <p>
              To arrive {Math.floor(extraTime / 60)} minutes before departure
            </p>
            <p>
              with a {Math.ceil(duration / 60)} minute drive to the airport.
            </p>
          </div>
          <div className="slider-container">
            <Slider
              max={(checkInAndBagDropClose || 2700) + 1800}
              min={0}
              step={60}
              marks={flight ? sliderMarkers : placeHolderSlidermarkers}
              value={extraTime}
              onChange={value => this.setState({ extraTime: value })}
              handleStyle={viewMode.handle}
              dotStyle={viewMode.dot}
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
