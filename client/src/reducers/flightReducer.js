import {
  GET_FLIGHT_DETAILS,
  COULD_NOT_FIND_FLIGHT,
  UPDATE_FLIGHT_DETAILS
} from '../types'

const default_state = {
  flight: '',
  filedDepartureTime: null,
  actualDepartureTime: null,
  origin: '',
  destination: ''
}

//split up flight data into state

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
    case UPDATE_FLIGHT_DETAILS:
      return {
        ...state,
        filedDepartureTime: action.payload.filed_departuretime,
        actualDepartureTime: action.payload.actualdeparturetime,
        origin: action.payload.origin,
        destination: action.payload.destination
      }
    case COULD_NOT_FIND_FLIGHT:
      return {
        flight: COULD_NOT_FIND_FLIGHT,
        filedDepartureTime: COULD_NOT_FIND_FLIGHT,
        actualDepartureTime: COULD_NOT_FIND_FLIGHT,
        origin: COULD_NOT_FIND_FLIGHT,
        destination: COULD_NOT_FIND_FLIGHT
      }
    default:
      return state
  }
}
