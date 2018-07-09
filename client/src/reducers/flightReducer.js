import { GET_FLIGHT_DETAILS, FETCH_EXISTING_FLIGHT } from '../types'

const default_state = {
  flight: '',
  details: [{ident: 0}]
}

export default (state = default_state, action) => {
  console.log('IN REDUCER', action.payload)
  switch(action.type) {
    case FETCH_EXISTING_FLIGHT:
      return { ...state, flight: action.payload }
    case GET_FLIGHT_DETAILS:
      return { ...state, details: action.payload }
    default:
      return state
  }
}
