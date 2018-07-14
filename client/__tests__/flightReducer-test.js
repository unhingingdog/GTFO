import flightReducer from '../src/reducers/flightReducer'
import * as types from '../src/types'
import { flightInfo } from '../../testData/flightAwareTestData'

describe('Flight reducer', () => {
  let initial_state

  beforeEach(() => {
    initial_state = {
      flight: '',
      details: []
    }
  })

  it('should return flight data', () => {
    expect(flightReducer(initial_state, {
      type: types.GET_FLIGHT_DETAILS,
      payload: flightInfo
    })).toEqual({ flight: flightInfo.ident, details: flightInfo})
  })
})
