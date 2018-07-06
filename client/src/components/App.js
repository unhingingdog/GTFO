import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <h2>Header</h2>
      <a href="/flight">flight</a>
    </div>
  )
}

const FlightInput = () => {
  return <h2>flight input</h2>
}

const FlightDetails = () => {
  return <h2>flight details</h2>
}

export default () => {
  return(
    <div>
      <Header />
      <BrowserRouter>
        <div>
          <Route path="/" exact component={FlightInput} />
          <Route path="/flight" component={FlightDetails} />
        </div>
      </BrowserRouter>
    </div>
  )
}

// <Header />
// <FlightInput />
// <FlightDetails />
