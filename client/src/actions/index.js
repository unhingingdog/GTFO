import axios from 'axios'
import { FETCH_FLIGHT } from '../types'

export const fetchFlight = () => async dispatch => {
    const payload = await axios.get('/api/current_flight').data
    dispatch({ type: FETCH_FLIGHT, payload })
}
