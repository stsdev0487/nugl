import * as ActionTypes from './actionTypes'

export const showLoading = message => {
  return {
    type: ActionTypes.SHOW_LOADING,
    data: message,
  }
}

export const hideLoading = () => {
  return { type: ActionTypes.HIDE_LOADING }
}

export const withLoading = func => {
  return dispatch => {
    dispatch(showLoading())
    return func
      .then(result => {
        dispatch(hideLoading())
        return Promise.resolve(result)
      })
      .catch(err => {
        dispatch(hideLoading())
        return Promise.reject(err)
      })
  }
}
