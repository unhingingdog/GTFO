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
  console.log(action.payload)
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
        error: null,
        flight: upcomingFlight.ident,
        filedDepartureTime: upcomingFlight.filed_departuretime,
        actualDepartureTime: upcomingFlight.actualdeparturetime,
        origin: upcomingFlight.origin,
        destination: upcomingFlight.destination,
        nextFlightDetails: nextFlight,
        distance: upcomingFlight.distance.value,
        duration: upcomingFlight.duration.value,
        arriveAtGate: upcomingFlight.arriveAtGate,
        checkInAndBagDropClose: upcomingFlight.checkInAndBagDropClose,
        checkInAndBagDropOpen: upcomingFlight.checkInAndBagDropOpen,
        gateClosed: upcomingFlight.gateClosed,
        originCity: upcomingFlight.originCity,
        destinationCity: upcomingFlight.destinationCity
      }
    default:
      return state
  }
}
