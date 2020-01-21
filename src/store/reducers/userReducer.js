import * as ActionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default (state = initialState.user, action) => {
  switch (action.type) {
    case ActionTypes.RECEIVE_USER_ON_STATE_CHANGED:
    case ActionTypes.SIGN_IN_SUCCESS:
    case ActionTypes.SIGN_UP_SUCCESS:
      const {
        user: { displayName, email, phoneNumber, photoURL, uid, metadata },
      } = action
      return {
        authenticated: true,
        creationTime: metadata.creationTime,
        displayName,
        email,
        phoneNumber,
        photoURL: photoURL || '',
        uid,
      }
    case ActionTypes.UPDATE_EMAIL_SUCCESS:
      return { ...state, email: action.email }
    case ActionTypes.SIGN_OUT_SUCCESS: {
      return null
    }
    case ActionTypes.UPDATE_USER_PROFILE_PHOTO_URL_TEMP:
    case ActionTypes.UPDATE_USER_PROFILE_PHOTO_URL_SUCCESS: {
      return { ...state, photoURL: action.photoUrl }
    }
    default:
      return state
  }
}
