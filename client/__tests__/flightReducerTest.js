import flightReducer from '../src/reducers/flightReducer'
import * as types from '../src/types'
import {
  flightInfo,
  flightInfoAsync,
  airportDistanceFlightInfo
} from '../../testData/externalAPITestData'
import { airlineArrivalTimes } from '../../utils/flightAndAirportInfo'

describe('Flight reducer', () => {
  let initial_state
  let flightInfo

  beforeEach(async () => {
    initial_state = {
      flight: '',
      filedDepartureTime: null,
      actualDepartureTime: null,
      origin: '',
      destination: '',
      nextFlightDetails: {},
      distance: {},
      duration: {},
      arriveAtGate: null,
      checkInAndBagDropClose: null,
      checkInAndBagDropOpen: null,
      gateClosed: null,
      error: null
    }
    flightInfo = await flightInfoAsync('JQ291')
    flightInfo = flightInfo.reverse()
    flightInfo = flightInfo.map(flight => {
      return {
        ...flight,
        ...airlineArrivalTimes.JQ.domestic,
        ...airportDistanceFlightInfo[0]
      }
    })
  })

  it('should return flight data', () => {
    expect(flightReducer(initial_state, {
      type: types.GET_FLIGHT_DETAILS,
      payload: flightInfo
    })).toEqual({
      ...initial_state,
      flight: flightInfo[0].ident,
      filedDepartureTime: flightInfo[0].filed_departuretime,
      actualDepartureTime: flightInfo[0].actualdeparturetime,
      origin: flightInfo[0].origin,
      destination: flightInfo[0].destination,
      destinationCity: flightInfo[0].destinationCity,
      originCity: flightInfo[0].originCity,
      nextFlightDetails: flightInfo[1],
      distance: flightInfo[0].distance.value,
      duration: flightInfo[0].duration.value,
      arriveAtGate: flightInfo[0].arriveAtGate,
      checkInAndBagDropClose: flightInfo[0].checkInAndBagDropClose,
      checkInAndBagDropOpen: flightInfo[0].checkInAndBagDropOpen,
      gateClosed: flightInfo[0].gateClosed
    })
  })

  it('should handle no flight data', () => {
    const flightInfo = [{ error: "Airline unknown" }]
    expect(flightReducer(initial_state, {
      type: types.GET_FLIGHT_DETAILS,
      payload: flightInfo
    })).toEqual({
      ...initial_state,
      error: "Airline unknown"
    })
  })
})
