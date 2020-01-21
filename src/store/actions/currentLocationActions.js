import * as ActionTypes from './actionTypes'

export const setCurrentPoint = currentPoint => {
  return {
    type: ActionTypes.SET_CURRENT_POINT,
    currentPoint,
  }
}

export const setCurrentLocation = currentLocation => {
  return {
    type: ActionTypes.SET_CURRENT_LOCATION,
    currentLocation,
  }
}

export const setCurrentPointAndLocation = currentPointAndLocation => {
  return {
    type: ActionTypes.SET_CURRENT_POINT_AND_LOCATION,
    currentPointAndLocation,
  }
}

export const setCurrentTimeZone = currentTimeZone => {
  return {
    type: ActionTypes.SET_CURRENT_TIMEZONE,
    currentTimeZone,
  }
}
