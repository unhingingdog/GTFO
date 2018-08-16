import React from 'react'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

import FlightDetails from '../src/components/FlightDetails'
import Root from '../src/Root'
import { flightInfo } from '../../testData/externalAPITestData'

let initialState = {
  flight: {
    flight: flightInfo[0].ident,
    filedDepartureTime: 1602324610,
    actualDepartureTime: 0,
    destinationCity: flightInfo[0].destinationCity,
    originCity: flightInfo[0].originCity,
    nextFlightDetails: null,
    distance: 10897,
    duration: 3120,
    arriveAtGate: 1602324610 - 2400,
    checkInAndBagDropClose: 1602324610 - 3600,
    checkInAndBagDropOpen: 7200,
    gateClosed: 1602324610 - 1200,
  }
}

let wrapped
let flight
let flightDetails
let departure
let arriveAtGate
let checkInAndBagDropOpen
let checkInAndBagDropClose
let gateClosed
let leaveForcheckInAndBagDropClose
let leaveForGateClosed

beforeEach(() => {
  wrapped = mount(
  <Root initialState={initialState}>
    <FlightDetails />
  </Root>
  )

  flight = wrapped.find("#fd-flight-number").text()
  flightDetails = wrapped.find("#fd-flight-details").text()
  departure = wrapped.find("#fd-departure-time").text()
  arriveAtGate = wrapped.find("#fd-arrive-at-gate-time").text()
  checkInAndBagDropClose =
    wrapped.find("#fd-check-in-and-baggage-drop-close-time").text()
  checkInAndBagDropOpen = wrapped.find("#fd-check-in-and-baggage-open-time").text()
  gateClosed = wrapped.find("#fd-gate-close-time").text()
  arriveAtGate = wrapped.find("#fd-leave-for-arrive-at-gate").text()
  leaveForcheckInAndBagDropClose =
  wrapped.find("#fd-leave-for-check-in-and-bag-drop-close").text()
  leaveForGateClosed = wrapped.find("#fd-leave-for-gate-closed").text()
})

afterEach(() => wrapped.unmount())

it('Shows the correct initial flight details/times', () => {
  expect(flight).to.equal(flightInfo[0].ident)
  expect(flightDetails).to.equal('Wellington to Christchurch - Sat Oct 10 2020')
  expect(departure)
    .to.equal('departs: 23:10:10 GMT+1300 (New Zealand Daylight Time)')
  expect(arriveAtGate)
    .to.equal('Leave to arrive at gate: 11:48:00 GMT+1200 (New Zealand Daylight Time)')
  expect(checkInAndBagDropClose)
    .to.equal('checkin and baggage drop close: 13:00:00 GMT+1200 (New Zealand Standard Time)')
  expect(checkInAndBagDropOpen)
    .to.equal('Check in and baggage open: 21:10:10 GMT+1300 (New Zealand Daylight Time)')
  expect(gateClosed)
    .to.equal('Gate closes: 12:20:00 GMT+1200 (New Zealand Standard Time)')
  expect(arriveAtGate)
    .to.equal('Leave to arrive at gate: 11:48:00 GMT+1200 (New Zealand Daylight Time)')
  expect(leaveForcheckInAndBagDropClose)
    .to.equal('Leave to arrive before bag drop closes: 12:08:00 GMT+1200 (New Zealand Standard Time)')
  expect(leaveForGateClosed)
    .to.equal('Leave to arrive before gate closes: 11:28:00 GMT+1200 (New Zealand Daylight Time)')
})
