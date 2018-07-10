import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import { submitFlight } from '../actions'
const cookies = new Cookies()

class FlightInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formContent: ''
    }
  }

  componentDidMount() {
    this.setState({ formContent: cookies.get('flight') || '' })
  }

  render() {
    console.log(this.state.formContent)

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
}

const mapStateToProps = state => {
  return {
    flight: state.flight.flight,
    details: state.flight.details
  }
}

export default connect(mapStateToProps, { submitFlight })(FlightInput)
