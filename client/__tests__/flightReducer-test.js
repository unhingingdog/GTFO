import flightReducer from '../src/reducers/flightReducer'
import * as types from '../src/types'
import { flightInfo } from '../../testData/flightAwareTestData'

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
})
