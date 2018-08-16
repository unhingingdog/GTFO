import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

export class FlightDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sliderValue: 0
    }
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

    const leaveforArriveAtGate =
      new Date((departure - arriveAtGate - duration) * 1000).toTimeString()

    const leaveForcheckInAndBagDropClose =
      new Date((departure - checkInAndBagDropClose - duration) * 1000)
        .toTimeString()

    const leaveForGateClosed =
      new Date((departure - gateClosed - duration) * 1000).toTimeString()

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

    return(
      <div id="flight-details-container">
        <h1 id="fd-flight-number">{flight}</h1>
        <p id="fd-flight-details">{originCity} to {destinationCity} - {date}</p>
        <p id="fd-departure-time">departs: {departureTime}</p>
        <br />
        <div className="slider-container">
          <Slider

          />
        </div>
        <br />
        <p id="fd-arrive-at-gate-time">Arrive at gate: {arriveAtGateTime}</p>
        <p id="fd-check-in-and-baggage-drop-close-time">
          checkin and baggage drop close: {checkinAndBaggageDropCloseTime}
        </p>
        <p id="fd-check-in-and-baggage-open-time">
          Check in and baggage open: {checkInAndBaggageOpenTime}
        </p>
        <p id="fd-gate-close-time">
          Gate closes: {gateCloseTime}
        </p>
        <p id="fd-leave-for-arrive-at-gate">
          Leave to arrive at gate: {leaveforArriveAtGate}
        </p>
        <p id="fd-leave-for-check-in-and-bag-drop-close">
        Leave to arrive before bag drop closes: {leaveForcheckInAndBagDropClose}
        </p>
        <p id="fd-leave-for-gate-closed">
          Leave to arrive before gate closes: {leaveForGateClosed}
        </p>
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
