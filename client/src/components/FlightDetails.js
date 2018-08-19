import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularSlider from 'react-circular-slider-bar'

export class FlightDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      extraTime: 0
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
        arriveAtGate -
        duration -
        (this.state.extraTime)
      ) * 1000).toTimeString()

    return(
      <div id="flight-details-container">
        <section id="fd-title">
          <h1 id="fd-flight-number">{flight || 'EG123'}</h1>
          <p id="fd-flight-details">
            {originCity || 'originCity'} to
            {' ' + destinationCity + ' ' || 'destinationCity'} on
            {' ' + date}
          </p>
        </section>

        <section id="fd-leavetime-slider">
          <div className="slider-container">
            <CircularSlider
              r={150}
              value={this.state.extraTime}
              trackWidth={10}
              thumbWidth={15}
              trackColor="white"
              onChange={value => this.setState({ extraTime: Math.ceil(value) })}
            />
            <h2 id="fd-leave-at">Leave at {leaveAt}</h2>
            <p>{this.state.extraTime} minutes</p>
          </div>
        </section>

        <section id="fd-other-details">
          <p id="fd-departure-time">departs: {departureTime}</p>
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
        </section>

        <section id="fd-map">

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
