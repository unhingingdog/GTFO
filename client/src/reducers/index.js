import { combineReducers } from 'redux'
import flightReducer from './flightReducer'
import geolocationReducer from './geolocationReducer'
import loadingReducer from './loadingReducer'

export default combineReducers({
  flight: flightReducer,
  location: geolocationReducer,
  loading: loadingReducer
})
