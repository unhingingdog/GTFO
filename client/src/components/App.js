import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import FlightInput from './FlightInput'
import FlightDetails from './FlightDetails'

import * as actions from '../actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchFlight()
  }

  render() {
    return(
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={FlightInput} />
            <Route path="/flight" component={FlightDetails} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
