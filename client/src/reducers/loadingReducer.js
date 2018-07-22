import {
  START_LOADING,
  STOP_LOADING
} from '../types'

const default_state = {
  currentlyLoading: false,
  message: ''
}

export default (state = default_state, action) => {
  switch(action.type) {
    case START_LOADING:
      return {
        currentlyLoading: true,
        message: action.payload
      }
    case STOP_LOADING:
      return {
        currentlyLoading: false,
        message: ''
      }
    default:
      return state
  }
}
