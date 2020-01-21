import * as ActionTypes from './actionTypes'

export function setCenterPoint(point, markerId, removeMarker) {
  return { type: ActionTypes.SET_CENTER_POINT, point, markerId, removeMarker }
}

export function setMarkerId(markerId) {
  return { type: ActionTypes.SET_MARKER_ID, markerId }
}

export function setSearchText(searchText) {
  return { type: ActionTypes.SET_SEARCH_TEXT, searchText }
}

export function clearSearch() {
  return { type: ActionTypes.CLEAR_SEARCH }
}
