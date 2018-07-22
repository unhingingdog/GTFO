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
  destination: '',
  nextFlightDetails: null
}

export default (state = default_state, action) => {
  switch(action.type) {
    case GET_FLIGHT_DETAILS:
      const upcomingFlight = action.payload[0]
      const nextFlight = action[1] ? action[1] : null
      return {
        flight: upcomingFlight.ident,
        filedDepartureTime: upcomingFlight.filed_departuretime,
        actualDepartureTime: upcomingFlight.actualdeparturetime,
        origin: upcomingFlight.origin,
        destination: upcomingFlight.destination,
        nextFlightDetails: nextFlight,
        distance: upcomingFlight.distance,
        duration: upcomingFlight.duration
      }
    case UPDATE_FLIGHT_DETAILS:
      return {
        ...state,
        filedDepartureTime: action.payload.filed_departuretime,
        actualDepartureTime: action.payload.actualdeparturetime,
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
