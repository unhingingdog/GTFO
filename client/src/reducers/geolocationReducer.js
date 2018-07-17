import {
  CURRENT_LOCATION_NOT_ENABLED,
  SET_CURRENT_LOCATION,
  SET_DESTINATION_LOCATION
} from '../types'

const default_state = {
  currentLatitude: null,
  currentLongitude: null,
  destinationLatitude: null,
  destinationLongitude: null
}

export default (state = default_state, action) => {
  console.log(action.payload)
  switch(action.type) {
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLatitude: action.payload.currentLatitude,
        currentLongitude: action.payload.currentLongitude,
      }
    case SET_DESTINATION_LOCATION:
      return {
        ...state,
        destinationLatitude: action.payload.destinationLatitude,
        destinationLongitude: action.payload.destinationLongitude
      }
    case CURRENT_LOCATION_NOT_ENABLED:
      return {
        ...state,
        currentLatitude: CURRENT_LOCATION_NOT_ENABLED,
        currentLongitude: CURRENT_LOCATION_NOT_ENABLED
      }
    default:
      return state
  }
}
