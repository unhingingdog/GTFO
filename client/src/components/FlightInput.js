import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import { isMobile } from "react-device-detect";
import Input from './Input'
import PlaneButton from './PlaneButton'
import {
  submitFlight,
  clearFlightError,
  setCurrentLocation,
  startLoading,
  stopLoading
} from '../actions'
import { CURRENT_LOCATION_NOT_ENABLED } from '../types'


const cookies = new Cookies()

export class FlightInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formContent: ''
    }
  }

  componentDidMount() {
    this.setState({ formContent: cookies.get('flight') || '' })
    this.setGeolocation()
  }

  componentDidUpdate() {
    const { flightError, flight, history } = this.props
    if (!flightError && flight) history.push('/flight')
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  render() {
    const { loadingMessage, flightError } = this.props

    return(
      <div id="container">
        <div id="title">
          <h2>Get the Flight Out</h2>
        </div>
        <Input
          formContent={this.state.formContent}
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
          isMobile={isMobile}
        />
        <PlaneButton
          formContent={this.state.formContent}
          submitFlightCode={this.submitFlightCode}
          loadingMessage={loadingMessage}
          error={flightError}
        />
      </div>
    )
  }

  handleChange = event => {
    this.setState({
      formContent: event.target.value.toUpperCase()
     })
  }

  submitFlightCode = async () => {
    const {
      submitFlight,
      startLoading,
      stopLoading,
      flightError,
      clearFlightError,
      currentLatitude,
      currentLongitude
    } = this.props

    const { formContent } = this.state

    if (flightError) clearFlightError()
    startLoading('Submitting')
    await submitFlight(formContent, currentLatitude, currentLongitude)
    cookies.set('flight', formContent, {
      path: '/',
      expires: new Date((this.props.departure * 1000) + 3600000)
    })
    stopLoading()
  }

  handleFormSubmit = event => {
    event.preventDefault()
    if (this.props.currentLatitude && this.state.formContent.length >= 4) {
      this.submitFlightCode()
    }
  }

  getGeolocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  setGeolocation = () => {
    const {
      setCurrentLocation,
      startLoading,
      stopLoading,
      history
    } = this.props

    startLoading('Getting your location')
    this.getGeolocation()
      .then(result => {
        console.log(result)
        setCurrentLocation(result)
        stopLoading()
      })
      .catch(err => {
        console.log(err)
        setCurrentLocation(CURRENT_LOCATION_NOT_ENABLED)
        history.push('/no_location')
        stopLoading()
      })
  }
}

const mapStateToProps = state => {
  return {
    flight: state.flight.flight,
    flightError: state.flight.error,
    departure: state.flight.filedDepartureTime,
    currentLatitude: state.location.currentLatitude,
    currentLongitude: state.location.currentLongitude,
    currentlyLoading: state.loading.currentlyLoading,
    loadingMessage: state.loading.message
  }
}

export default connect(mapStateToProps, {
  submitFlight,
  clearFlightError,
  setCurrentLocation,
  startLoading,
  stopLoading
})(FlightInput)
