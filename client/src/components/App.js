import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import FlightInput from './FlightInput'
import FlightDetails from './FlightDetails'
import NoLocation from './NoLocation'

import * as actions from '../actions'

class App extends Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={FlightInput} />
            <Route path="/flight" component={FlightDetails} />
            <Route path="/no_location" component={NoLocation} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
