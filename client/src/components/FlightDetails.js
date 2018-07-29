import React, { Component } from 'react'
import { connect } from 'react-redux'

export class FlightDetails extends Component {
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

    const leaveTime = new Date((departure - arriveAtGate - duration) * 1000).toTimeString()


    return(
      <div>
        <h1>{flight}</h1>
        <p>{originCity} to {destinationCity}</p>
        <p>departs: {departure}</p>
        <br />
        <p>Arrive at gate: {departure - arriveAtGate}</p>
        <p>checkin and baggage drop close: {departure - checkInAndBagDropClose}</p>
        <p>Check in and baggage open: {departure - checkInAndBagDropOpen}</p>
        <p>Gate closes: {departure - gateClosed}</p>

        <p>Leave to arrive at gate: {leaveTime}</p>
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
