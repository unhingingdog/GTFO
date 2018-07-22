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

  if (flightsData === types.COULD_NOT_FIND_FLIGHT) {
    dispatch({ type: types.COULD_NOT_FIND_FLIGHT })
  }
  console.log(flightsData.data)
  dispatch({ type: types.GET_FLIGHT_DETAILS, payload: flightsData.data })
}

export const startLoading = payload => { types.START_LOADING, message }

export const stopLoading = () => { types.STOP_LOADING }
