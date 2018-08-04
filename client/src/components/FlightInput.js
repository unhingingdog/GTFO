import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import { isMobile } from "react-device-detect";
import Loading from './Loading'
import Input from './Input'
import PlaneButton from './PlaneButton'
import {
  submitFlight,
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
      formContent: '',
      takeoff: false
    }
  }

  componentDidMount() {
    this.setState({ formContent: cookies.get('flight') || '' })
    window.addEventListener('scroll', this.onScroll, false)
    this.setGeolocation()
  }

  onScroll = () => {
    this.submitOnScrollIfFlightCodePresent()
  }

  componentDidUpdate() {
    const { flightError, flight, history } = this.props
    if (!flightError && flight) history.push('/flight')
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  render() {
    const { loadingMessage } = this.props

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
        />
      </div>
    )
  }

  handleChange = event => {
    this.setState({
      formContent: event.target.value.toUpperCase()
     })
     console.log(this.state.formContent)
  }

  fitFormTextSize = text => {
    if (isMobile) {
      if (text.length > 5) return 100 - ((text.length - 5) * 10)
      return 100
    }
    if (text.length > 5) return 180 - ((text.length - 5) * 10)
    return 180
  }

  submitFlightCode = async () => {
    this.setState({ takeoff: true })

    setTimeout(async () => {
      const { submitFlight, departure,startLoading, stopLoading } = this.props
      const { currentLatitude, currentLongitude } = this.props
      const { formContent, takeoff } = this.state
      startLoading('Submitting')
      await submitFlight(formContent, currentLatitude, currentLongitude)
      cookies.set('flight', formContent, {
        path: '/',
        expires: new Date((this.props.departure * 1000) + 3600000)
      })
      stopLoading()
    }, 500)
  }

  submitOnScrollIfFlightCodePresent = () => {
    if (this.state.formContent.length >= 5) this.submitFlightCode()
  }

  handleFormSubmit = event => {
    event.preventDefault()
    this.submitFlightCode()
  }

  getGeolocation = () => {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  setGeolocation = () => {
    const { setCurrentLocation, startLoading, stopLoading } = this.props
    startLoading('Where you at?')

    this.getGeolocation()
      .then(result => {
        console.log(result)
        setCurrentLocation(result)
        stopLoading()
      })
      .catch(err => {
        console.log(err)
        setCurrentLocation(CURRENT_LOCATION_NOT_ENABLED)
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
  setCurrentLocation,
  startLoading,
  stopLoading
})(FlightInput)
