import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
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
    }
  }

  componentDidMount() {
    this.setState({ formContent: cookies.get('flight') || '' })
    this.setGeolocation()
  }

  render() {
    return(
      <div>
        <form onSubmit={this.submitFlight}>
          <label>
            <input
              type="text"
              value={this.state.formContent}
              onChange={e => this.setState({ formContent: e.target.value })}
            />
          </label>
          <p>{this.props.loadingMessage}</p>
          <p>{this.props.origin} to {this.props.destination}</p>
          <p>{this.props.loadingMessage}</p>
        </form>
      </div>
    )
  }

  submitFlight = e => {
    e.preventDefault()
    const { submitFlight } = this.props
    const { currentLatitude, currentLongitude } = this.props
    const { formContent } = this.state
    submitFlight(formContent, currentLatitude, currentLongitude)
    cookies.set('flight', formContent, { path: '/' })
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
    origin: state.flight.origin,
    destination: state.flight.destination,
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
