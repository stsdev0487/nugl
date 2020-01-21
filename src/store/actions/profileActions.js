import * as ActionTypes from './actionTypes'
import MessageTypes from '../../const/MessageTypes'
import { auth, firestore } from '../../firebase'

const updateProfileSuccess = profile => {
  return {
    type: ActionTypes.UPDATE_PROFILE_SUCCESS,
    profile,
  }
}

export const receiveProfileFromSnapshot = profile => {
  return {
    type: ActionTypes.RECEIVE_PROFILE_FROM_SNAPSHOT,
    profile,
  }
}

const updateProfileImageSuccess = photoUrl => {
  return {
    type: ActionTypes.UPDATE_USER_PROFILE_PHOTO_URL_SUCCESS,
    photoUrl,
  }
}

const updateProfileImageError = message => {
  return {
    type: ActionTypes.UPDATE_USER_PROFILE_PHOTO_URL_SUCCESS,
    message: { type: MessageTypes.ERROR, text: message },
  }
}

export const updateProfile = (uid, profile) => {
  return dispatch => {
    const profileRef = firestore.collection('profiles').doc(uid)
    return profileRef
      .set(profile, { merge: true })
      .then(() => {
        return dispatch(updateProfileSuccess(profile))
      })
      .catch(() => {})
  }
}

export const updateProfileImage = (uid, photoUrl) => {
  return dispatch => {
    return Promise.all([
      auth.currentUser.updateProfile({ photoURL: photoUrl }),
      firestore
        .collection('profiles')
        .doc(uid)
        .set({ photoUrl: photoUrl }, { merge: true }),
    ])
      .then(() => {
        dispatch(updateProfileImageSuccess(photoUrl))
      })
      .catch(() => {
        dispatch(updateProfileImageError('Failed to update profile photo.'))
      })
  }
}
