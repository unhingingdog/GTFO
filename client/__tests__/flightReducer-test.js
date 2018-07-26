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
      nextFlightDetails: {}
    }
    flightInfo = await flightInfoAsync('JQ291')
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
      flight: flightInfo[0].ident,
      filedDepartureTime: flightInfo[0].filed_departuretime,
      actualDepartureTime: flightInfo[0].actualdeparturetime,
      origin: flightInfo[0].origin,
      destination: flightInfo[0].destination,
      nextFlightDetails: flightInfo[1],
      distance: flightInfo[0].distance,
      duration: flightInfo[0].duration
    })
  })

  // it('should update flight data', () => {
  //   expect(flightReducer({...initial_state, flight: flightInfo.ident}, {
  //     type: types.UPDATE_FLIGHT_DETAILS,
  //     payload: flightInfo
  //   })).toEqual({
  //     flight: flightInfo.ident,
  //     filedDepartureTime: flightInfo.filed_departuretime,
  //     actualDepartureTime: flightInfo.actualdeparturetime,
  //     origin: flightInfo.origin,
  //     destination: flightInfo.destination,
  //     nextFlightDetails: {}
  //   })
  // })

  it('should handle no flight data', () => {
    expect(flightReducer(initial_state, {
      type: types.COULD_NOT_FIND_FLIGHT
    })).toEqual({
      flight: types.COULD_NOT_FIND_FLIGHT,
      filedDepartureTime: types.COULD_NOT_FIND_FLIGHT,
      actualDepartureTime: types.COULD_NOT_FIND_FLIGHT,
      origin: types.COULD_NOT_FIND_FLIGHT,
      destination: types.COULD_NOT_FIND_FLIGHT
    })
  })
})
