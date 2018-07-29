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

    const leaveforArriveAtGate =
      new Date((departure - arriveAtGate - duration) * 1000).toTimeString()

    const leaveForcheckInAndBagDropClose =
      new Date((departure - checkInAndBagDropClose - duration) * 1000).toTimeString()

    const leaveForGateClosed =
      new Date((departure - gateClosed - duration) * 1000).toTimeString()

    return(
      <div>
        <h1>{flight}</h1>
        <p>{originCity} to {destinationCity} - {new Date((departure) * 1000).toDateString()}</p>
        <p>departs: {new Date((departure) * 1000).toTimeString()}</p>
        <br />
        <p>Arrive at gate: {new Date((departure - arriveAtGate) * 1000).toTimeString()}</p>
        <p>checkin and baggage drop close: {new Date((departure - checkInAndBagDropClose) * 1000).toTimeString()}</p>
        <p>Check in and baggage open: {new Date((departure - checkInAndBagDropOpen) * 1000).toTimeString()}</p>
        <p>Gate closes: {new Date((departure - gateClosed) * 1000).toTimeString()}</p>

        <p>Leave to arrive at gate: {leaveforArriveAtGate}</p>
        <p>Leave to arrive before bag drop closes: {leaveForcheckInAndBagDropClose}</p>
        <p>Leave to arrive before gate closes: {leaveForGateClosed}</p>
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
