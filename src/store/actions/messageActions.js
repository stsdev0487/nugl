import * as ActionTypes from './actionTypes'
import MessageTypes from '../../const/MessageTypes'

function push(type, text, timeout) {
  return { type: ActionTypes.PUSH_MESSAGE, message: { type, text, timeout } }
}

export function error(text) {
  return push(MessageTypes.ERROR, text)
}

export function warn(text) {
  return push(MessageTypes.WARN, text)
}

export function success(text) {
  return push(MessageTypes.SUCCESS, text)
}

export function loading(text, timeout) {
  return push(MessageTypes.LOADING, text, timeout)
}

export function pop() {
  return { type: ActionTypes.POP_MESSAGE }
}

export function customMessage(element) {
  return {
    type: ActionTypes.PUSH_MESSAGE,
    message: {
      type: 'custom',
      custom: element,
    },
  }
}
