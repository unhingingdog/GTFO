import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import { submitFlight } from '../actions'
import { CURRENT_LOCATION_NOT_ENABLED } from '../types'

const cookies = new Cookies()

export class FlightInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formContent: '',
      geolocation: null,
      time: Date.now()
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
        </form>
        <p>{this.state.geolocation}</p>
      </div>
    )
  }

  submitFlight = e => {
    e.preventDefault()
    const { submitFlight } = this.props
    const { formContent } = this.state
    submitFlight(formContent)
    cookies.set('flight', formContent, { path: '/' })
  }

  getGeolocation = () => {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  setGeolocation = () => {
    this.getGeolocation()
      .then(result =>  {
        const { latitude, longitude } = result.coords
        this.setState({
         geolocation: [latitude, longitude]
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({ geolocation: CURRENT_LOCATION_NOT_ENABLED })
      })
  }
}

const mapStateToProps = state => {
  return {
    flight: state.flight.flight,
    details: state.flight.details
  }
}

export default connect(mapStateToProps, { submitFlight })(FlightInput)
