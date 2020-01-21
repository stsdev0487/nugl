import * as ActionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default (state = initialState.currentLocation, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_POINT:
      return { ...state, ...action.currentPoint }
    case ActionTypes.SET_CURRENT_LOCATION:
      return { ...state, ...action.currentLocation }
    case ActionTypes.SET_CURRENT_POINT_AND_LOCATION:
      return { ...state, ...action.currentPointAndLocation }
    case ActionTypes.SET_CURRENT_TIMEZONE:
      return { ...state, timeZone: { ...action.currentTimeZone } }
    default:
      return state
  }
}
