import * as ActionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default (state = initialState.searchText, action) => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_TEXT:
      return action.searchText
    case ActionTypes.CLEAR_SEARCH:
      return ''
    default:
      return state
  }
}
