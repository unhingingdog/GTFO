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
    console.log(process.env)

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

      const isMobile = window.innerWidth < 800
      const styles = isMobile ? mobileStyles : desktopStyles


      const sliderMarkers = {
        0: {
          style: styles.bottomLabel,
          label: `Departs at ${departureTime.split(':').splice(0,2).join(':')}`
        },
        [gateClosed]: {
          style: styles.topLabel,
          label: `Gate closes at
            ${gateCloseTime.split(':').splice(0,2).join(':')}`
        },
        [arriveAtGate]: {
          style: styles.bottomLabel,
          label: `Arrive at gate
            ${arriveAtGateTime.split(':').splice(0,2).join(':')}`
        },
        [checkInAndBagDropClose]: {
          style: styles.topLabel,
          label: `Check-in/bag-drop close at
            ${checkinAndBaggageDropCloseTime.split(':').splice(0,2).join(':')}`
        },
      }

      const placeHolderSlidermarkers = {
        0: {
          style: styles.bottomLabel,
          label: `Departs (1:00)`
        },
        900: {
          style: styles.topLabel,
          label: `Gate closes (12:30)`
        },
        2376: {
          style: styles.bottomLabel,
          label: `Arrive at gate (12:00)`
        },
        2700: {
          style: styles.topLabel,
          label: `Check-in/bag-drop close (11:55)`
        }
    }

    return(
      <div style={styles.container}>
        <section style={styles.topContainer}>
          <p style={styles.flightSummary}>
            {(originCity || 'origin City')} to {destinationCity || 'destination City'} on {flightDate} ({flight || 'EG123'})
          </p>
          <h2 style={styles.leaveAt}>
            {`Leave at ${leaveAt.split(' ')[0].split(':').splice(0,2).join(':')}`}
          </h2>
          <p style={styles.tripDetails}>
          To arrive {Math.floor(extraTime / 60)} minutes before departure
          with a {Math.ceil(duration / 60)} minute drive to the airport.
          </p>
          <div style={styles.sliderContainer}>
            <Slider
              max={(checkInAndBagDropClose || 2700) + 1800}
              min={0}
              step={60}
              marks={flight ? sliderMarkers : placeHolderSlidermarkers}
              value={extraTime}
              onChange={value => this.setState({ extraTime: value })}
              handleStyle={styles.handle}
              dotStyle={styles.dot}
            />
          </div>
        </section>
        <section style={styles.mapContainer}>
          <Map
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfk4YRRRYLi3FMIgm-akdKcWRUt_q5I6Y&v=3.exp&libraries=geometry,drawing,places"
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

const desktopStyles = {
  container: {
    backgroundColor: '#d80404',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '100px',
    paddingBottom: '100px',
    padding: '70px 10px 120px 10px',
    fontSize: '16px',
    textAlign: 'center',
    textOverflow: 'clip'
  },
  leaveAt: {
    marginTop: '0px',
    fontSize: '42px',
    fontFamily: 'Do Hyeon',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    width: '100%'
  },
  tripDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-5px',
    fontFamily: 'Do Hyeon, sans-serif',
    textAlign: 'center',
    width: '100%'
  },
  flightSummary: {
    paddingBottom: '50px',
    fontFamily: 'sans-serif'
  },
  sliderContainer: {
    width: '85vw',
    padding: '40px 0 40px 0',
    fontFamily: 'Oxygen, sans-serif'
  },
  mapContainer: {
    width: '100vw'
  },
  topLabel: {
    color: 'white',
    top: -42
  },
  bottomLabel: {
    color: 'white',
    bottom: -20
  },
  handle: {
    width: 20,
    height: 20,
    top: 1
  },
  dot: {
    width: 12,
    height: 12,
    top: -4
  }
}

const mobileStyles = {
  container: {
    backgroundColor: '#d80404',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'clip'
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '100px',
    paddingBottom: '100px',
    padding: '70px 10px 120px 10px',
    fontSize: '16px',
    textAlign: 'center'
  },
  leaveAt: {
    marginTop: '0px',
    fontSize: '42px',
    fontFamily: 'Londrina Solid, sans-serif',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    width: '100%'
  },
  tripDetails: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Londrina Solid, sans-serif',
    textAlign: 'center',
    width: '100%',
    marginTop: -18
  },
  flightSummary: {
    padding: '-20px 0 50px 0',
    fontFamily: 'Londrina Solid, sans-serif'
  },
  sliderContainer: {
    width: '85vw',
    padding: '40px 0 40px 0',
    fontFamily: 'Londrina Solid, sans-serif'
  },
  mapContainer: {
    width: '100vw'
  },
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
  handle: {
    width: 23,
    height: 23,
    top: -0.5
  },
  dot: {
    width: 15,
    height: 15,
    top: -5
  }
}

// To arrive {Math.floor(extraTime / 60)} minutes before departure
// with a {Math.ceil(duration / 60)} minute drive to the airport.
