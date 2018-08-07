import axios from 'axios'
import * as types from '../types'

export const setCurrentLocation = locationData => {
  if (locationData === types.CURRENT_LOCATION_NOT_ENABLED)
    return { type: types.CURRENT_LOCATION_NOT_ENABLED }

  return { type: types.SET_CURRENT_LOCATION,  payload: {
    currentLongitude: locationData.coords.longitude,
    currentLatitude: locationData.coords.latitude
  }}
}

export const submitFlight = (tailNumber, latitude, longitude) => async dispatch => {
  const flightsData = await axios.get(
    `/api/get_flight/${tailNumber}&${latitude}&${longitude}`
  )

  dispatch({
    type: types.GET_FLIGHT_DETAILS,
    payload: flightsData.data.reverse()
  })
}

export const clearFlightError = () => {
  return { type: types.CLEAR_FLIGHT_ERROR }
}


export const startLoading = message => {
  return { type: types.START_LOADING, payload: message }
}

export const stopLoading = () => {
  return { type: types.STOP_LOADING }
}
