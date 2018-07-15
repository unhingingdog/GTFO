import { GET_FLIGHT_DETAILS, FETCH_EXISTING_FLIGHT } from '../types'

const default_state = {
  flight: '',
  filedDepartureTime: null,
  actualDepartureTime: null,
  origin: '',
  destination: ''
}

export default (state = default_state, action) => {
  switch(action.type) {
    case GET_FLIGHT_DETAILS:
      return {
        flight: action.payload.ident,
        filedDepartureTime: action.payload.filed_departuretime,
        actualDepartureTime: action.payload.actualdeparturetime,
        origin: action.payload.origin,
        destination: action.payload.destination
      }
    default:
      return state
  }
}
