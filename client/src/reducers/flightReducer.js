import { GET_FLIGHT_DETAILS, FETCH_EXISTING_FLIGHT } from '../types'

const default_state = {
  flight: '',
  details: [] //[{ident: 0}]
}

export default (state = default_state, action) => {
  switch(action.type) {
    case GET_FLIGHT_DETAILS:
      return { flight: action.payload.ident, details: action.payload }
    default:
      return state
  }
}
