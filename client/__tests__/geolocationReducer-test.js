import geolocationReducer from '../src/reducers/geolocationReducer'
import * as types from '../src/types'

describe('Flight reducer', () => {
  let initial_state

  beforeEach(() => {
    initial_state = {
      currentLatitude: null,
      currentLongitude: null,
      destinationLatitude: null,
      destinationLongitude: null
    }
  })

  it('set the user\'s current location', () => {
    const payload = {
      currentLatitude: 36.1126,
      currentLongitude: -115.1767
    }

    expect(geolocationReducer(initial_state, {
      type: types.SET_CURRENT_LOCATION,
      payload
    })).toEqual({
      currentLatitude: payload.currentLatitude,
      currentLongitude: payload.currentLongitude,
      destinationLatitude: null,
      destinationLongitude: null
    })
  })

  it('set the user\'s destination', () => {
    const payload = {
      destinationLatitude: 36.0840,
      destinationLongitude: -115.1537
    }

    expect(geolocationReducer(initial_state, {
      type: types.SET_DESTINATION_LOCATION,
      payload
    })).toEqual({
      currentLatitude: null,
      currentLongitude: null,
      destinationLatitude: payload.destinationLatitude,
      destinationLongitude: payload.destinationLongitude
    })
  })

  it('should handle no current geolocation data case', () => {
    expect(geolocationReducer(initial_state, {
      type: types.CURRENT_LOCATION_NOT_ENABLED
    })).toEqual({
      currentLatitude: types.CURRENT_LOCATION_NOT_ENABLED,
      currentLongitude: types.CURRENT_LOCATION_NOT_ENABLED,
      destinationLatitude: null,
      destinationLongitude: null
    })
  })
})
