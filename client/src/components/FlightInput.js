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

  componentDidUpdate() {
    const { flightError, flight, history } = this.props
    if (!flightError && flight) history.push('/flight')
  }

  render() {
    return(
      <div style={styles.container}>
        <h2>Get the Flight Out</h2>
        <form onSubmit={this.submitFlight} style={styles.form}>
          <label>
            <input
              type="text"
              value={this.state.formContent}
              placeholder="flightnum"
              maxlength="8"
              onChange={e => this.setState({
                formContent: e.target.value.toUpperCase()
               })}
              style={{
                ...styles.input,
                fontSize: this.fitFormTextSize(this.state.formContent)
              }}
            />
          </label>
        </form>
        <p>{this.props.loadingMessage}</p>
        <p>{this.props.flightError}</p>
      </div>
    )
  }

  fitFormTextSize = text => {
    if (text.length > 5) {
      const extraChars = text.length - 5
      return 80 - (extraChars * 10)
    }
    return 80
  }

  submitFlight = async event => {
    event.preventDefault()
    const { submitFlight, departure } = this.props
    const { currentLatitude, currentLongitude } = this.props
    const { formContent } = this.state
    await submitFlight(formContent, currentLatitude, currentLongitude)
    cookies.set('flight', formContent, {
      path: '/',
      expires: new Date((this.props.departure * 1000) + 3600000)
    })
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

const styles = {
  container: {
    background: '#d80404',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    background:'yellow'
  },
  input: {
    border: 'none',
    height: '20vh',
    width: '80vw',
    textAlign: 'center',
    color: 'white',
    background: '#d80404'
  }
}
