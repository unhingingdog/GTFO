import { combineReducers } from 'redux'
import flightReducer from './flightReducer'
import geolocationReducer from './geolocationReducer'

export default combineReducers({
  flight: flightReducer,
  locations: geolocationReducer
})
