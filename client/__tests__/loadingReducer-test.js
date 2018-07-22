import loadingReducer from '../src/reducers/loadingReducer'
import * as types from '../src/types'

describe('Loading reducer', () => {
  let initial_state

  beforeEach(() => {
    initial_state = {
      currentlyLoading: false,
      message: ''
    }
  })

  it('Changes state when loading', () => {
    const payload = 'Loading whatever'

    expect(loadingReducer(initial_state, {
      type: types.START_LOADING,
      payload
    })).toEqual({
      currentlyLoading: true,
      message: 'Loading whatever'
    })
  })

  it('Changes the state when done loading', () => {
    expect(loadingReducer(initial_state, {
      type: types.STOP_LOADING
    })).toEqual({
      currentlyLoading: false,
      message: ''
    })
  })
})
