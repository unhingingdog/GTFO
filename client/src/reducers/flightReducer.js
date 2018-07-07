import { FETCH_FLIGHT } from '../types'

export default (state = false, action) => {
  console.log(action)
  switch(action.type) {
    case FETCH_FLIGHT:
      return action.payload || false
    default:
      return state
  }
}
