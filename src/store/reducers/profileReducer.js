import * as ActionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default (state = initialState.profile, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_PROFILE_FROM_SNAPSHOT:
      return { ...action.profile }
    case ActionTypes.SIGN_OUT_SUCCESS:
      return null
    default:
      return state
  }
}
