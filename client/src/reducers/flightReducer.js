import {
  GET_FLIGHT_DETAILS
} from '../types'

const default_state = {
  flight: '',
  filedDepartureTime: null,
  actualDepartureTime: null,
  origin: '',
  destination: '',
  nextFlightDetails: null,
  error: null
}

export default (state = default_state, action) => {
  switch(action.type) {
    case GET_FLIGHT_DETAILS:
      if (action.payload[0].error) return {
         ...state,
         error: action.payload[0].error
      }
      const upcomingFlight = action.payload[0]
      const nextFlight = action.payload[1] ? action.payload[1] : null
      return {
        ...state,
        flight: upcomingFlight.ident,
        filedDepartureTime: upcomingFlight.filed_departuretime,
        actualDepartureTime: upcomingFlight.actualdeparturetime,
        origin: upcomingFlight.origin,
        destination: upcomingFlight.destination,
        nextFlightDetails: nextFlight,
        distance: upcomingFlight.distance,
        duration: upcomingFlight.duration,
        arriveAtGate: upcomingFlight.arriveAtGate,
        checkInAndBagDropClose: upcomingFlight.checkInAndBagDropClose,
        checkInAndBagDropOpen: upcomingFlight.checkInAndBagDropOpen,
        gateClosed: upcomingFlight.gateClosed
      }
    default:
      return state
  }
}
