import axios from 'axios'
import { GET_FLIGHT_DETAILS, FETCH_EXISTING_FLIGHT } from '../types'

export const submitFlight = (tailNumber, location = '#') => async dispatch => {
  const flightsData = await axios.get(`/api/get_flight/${tailNumber}`)
  dispatch({ type: GET_FLIGHT_DETAILS, payload: flightsData.data })
}
