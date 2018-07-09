import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitFlight } from '../actions'

class FlightInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formContent: ''
    }
  }

  render() {
    console.log('in component', this.props.details)

    return(
      <div>
        <form onSubmit={this.submitFlight}>
          <label>
            <input
              type="text"
              value={this.state.value}
              onChange={e => this.setState({ formContent: e.target.value })}
            />
          </label>
        </form>
      </div>
    )
  }

  submitFlight = e => {
    e.preventDefault()
    const { submitFlight } = this.props
    const { formContent } = this.state
    submitFlight(formContent)
  }
}

const mapStateToProps = state => {
  return {
    flight: state.flight.flight,
    details: state.flight.details
  }
}

export default connect(mapStateToProps, { submitFlight })(FlightInput)
