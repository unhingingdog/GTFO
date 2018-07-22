import flightReducer from '../src/reducers/flightReducer'
import * as types from '../src/types'
import { flightInfo } from '../../testData/externalAPITestData'

describe('Flight reducer', () => {
  let initial_state

  beforeEach(() => {
    initial_state = {
      flight: '',
      filedDepartureTime: null,
      actualDepartureTime: null,
      origin: '',
      destination: ''
    }
  })

  it('should return flight data', () => {
    expect(flightReducer(initial_state, {
      type: types.GET_FLIGHT_DETAILS,
      payload: flightInfo
    })).toEqual({
      flight: flightInfo.ident,
      filedDepartureTime: flightInfo.filed_departuretime,
      actualDepartureTime: flightInfo.actualdeparturetime,
      origin: flightInfo.origin,
      destination: flightInfo.destination
    })
  })

  it('should update flight data', () => {
    expect(flightReducer({...initial_state, flight: flightInfo.ident}, {
      type: types.UPDATE_FLIGHT_DETAILS,
      payload: flightInfo
    })).toEqual({
      flight: flightInfo.ident,
      filedDepartureTime: flightInfo.filed_departuretime,
      actualDepartureTime: flightInfo.actualdeparturetime,
      origin: flightInfo.origin,
      destination: flightInfo.destination
    })
  })

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
