import axios from 'axios'
import { GET_FLIGHT_DETAILS, FETCH_EXISTING_FLIGHT } from '../types'

export const submitFlight = (tailNumber, location = '#') => async dispatch => {
  const flightsData = await axios.get(`/api/get_flight/${tailNumber}`)
  console.log('IN ACTION', flightsData.data)
  dispatch({ type: GET_FLIGHT_DETAILS, payload: flightsData.data })
}

export const fetchFlight = () => async dispatch => {
    const payload = await axios.get('/api/current_flight').data
    console.log('in action', payload)
    dispatch({ type: FETCH_EXISTING_FLIGHT, payload })
}
