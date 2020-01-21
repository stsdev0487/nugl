import * as ActionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default (state = initialState.map, action) => {
  switch (action.type) {
    case ActionTypes.SET_CENTER_POINT:
      if (action.markerId) {
        return {
          ...state,
          center:
            action.point && action.point.lat ? action.point : state.center,
          markerId: action.markerId,
        }
      }
      if (action.removeMarker) {
        return {
          ...state,
          center:
            action.point && action.point.lat ? action.point : state.center,
          markerId: null,
        }
      }
      return state.markerId
        ? state
        : {
            ...state,
            default: false,
            center:
              action.point && action.point.lat ? action.point : state.center,
          }
    case ActionTypes.SET_MARKER_ID:
      return {
        ...state,
        markerId: action.markerId,
      }
    default:
      return state
  }
}
