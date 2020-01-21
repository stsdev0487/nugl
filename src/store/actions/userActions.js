import firebase from 'firebase/app'

import * as ActionTypes from './actionTypes'
import MessageTypes from '../../const/MessageTypes'
import { auth, provider } from '../../firebase'

const signInSuccess = user => {
  return {
    type: ActionTypes.SIGN_IN_SUCCESS,
    user,
  }
}

const signInError = message => {
  return {
    type: ActionTypes.SIGN_IN_ERROR,
    message: { type: MessageTypes.ERROR, text: message },
  }
}

const signUpSuccess = user => {
  return {
    type: ActionTypes.SIGN_UP_SUCCESS,
    user,
  }
}

const signUpError = message => {
  return {
    type: ActionTypes.SIGN_UP_ERROR,
    message: { type: MessageTypes.ERROR, text: message },
  }
}

const signOutSuccess = () => {
  return {
    type: ActionTypes.SIGN_OUT_SUCCESS,
    user: null,
    profile: null,
  }
}

const sendPasswordResetEmailSuccess = () => {
  return {
    type: ActionTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS,
  }
}

const sendEmailVerificationSuccess = () => {
  return {
    type: ActionTypes.SEND_EMAIL_VERIFICATION_SUCCESS,
  }
}

const updatePasswordSuccess = () => {
  return {
    type: ActionTypes.UPDATE_PASSWORD_SUCCESS,
  }
}

const updatePasswordError = message => {
  return {
    type: ActionTypes.UPDATE_PASSWORD_ERROR,
    message: { type: MessageTypes.ERROR, text: message },
  }
}

const updateEmailSuccess = email => {
  return {
    type: ActionTypes.UPDATE_EMAIL_SUCCESS,
    email,
  }
}

const updateEmailError = message => {
  return {
    type: ActionTypes.UPDATE_EMAIL_ERROR,
    message: { type: MessageTypes.ERROR, text: message },
  }
}

export const receiveUserOnAuthStateChanged = user => {
  return {
    type: ActionTypes.RECEIVE_USER_ON_STATE_CHANGED,
    user,
  }
}

export const signIn = (email, password) => {
  return dispatch => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(signInResponse => {
        dispatch(signInSuccess(signInResponse.user))
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/wrong-password':
            dispatch(signInError('Username and password is incorrect.'))
            throw new Error('Username and password is incorrect.')
          case 'auth/too-many-requests':
            dispatch(signInError('Too many failed login attempts.'))
            throw new Error('Too many failed login attempts.')
          default:
            dispatch(signInError('Username and password is incorrect.'))
            throw new Error('Unknown error trying to sign in.')
        }
      })
  }
}

export const signInWithProvider = () => {
  return dispatch => {
    return auth
      .signInWithPopup(provider)
      .then(user => {
        dispatch(signInSuccess(user))
      })
      .catch(error => {})
  }
}

export const signOut = () => {
  return dispatch => {
    return auth.signOut().then(result => {
      dispatch(signOutSuccess())
    })
  }
}

export const signUp = (email, password) => {
  return dispatch => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(createUserResponse => {
        dispatch(signUpSuccess(createUserResponse.user))
        return Promise.resolve(createUserResponse.user.uid)
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            dispatch(signUpError('Email address is already in use.'))
            throw new Error('Email address is already in use.')
          default:
            throw new Error('Unknown error trying to create your account.')
        }
      })
  }
}

export const sendPasswordResetEmail = email => {
  return dispatch => {
    return auth.sendPasswordResetEmail(email).then(result => {
      dispatch(sendPasswordResetEmailSuccess())
    })
  }
}

export const sendEmailVerification = () => {
  return dispatch => {
    return auth.currentUser.sendEmailVerification().then(result => {
      dispatch(sendEmailVerificationSuccess())
    })
  }
}

export const updateEmail = (newEmail, currentPassword) => {
  return dispatch => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword,
    )
    return auth.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        return auth.currentUser
          .updateEmail(newEmail)
          .then(() => {
            dispatch(updateEmailSuccess(newEmail))
          })
          .catch(error => {
            dispatch(updateEmailError())
            return Promise.reject(error)
          })
      })
      .catch(({ code }) => {
        return Promise.reject(code)
      })
  }
}

export const updatePassword = (currentPassword, newPassword) => {
  return dispatch => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword,
    )
    return auth.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        return auth.currentUser
          .updatePassword(newPassword)
          .then(() => {
            dispatch(updatePasswordSuccess())
          })
          .catch(error => {
            console.error(error)
            dispatch(
              updatePasswordError(
                'Failed to update password. Please re-authenticate.',
              ),
            )
          })
      })
      .catch(error => {
        console.error(error)
        dispatch(updatePasswordError('Failed to update password.'))
      })
  }
}
