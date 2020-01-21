import * as ActionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default (state = initialState.loading, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOADING:
      return { loading: true, ...action.data }
    case ActionTypes.HIDE_LOADING:
      return initialState.loading
    default:
      return state
  }
}
