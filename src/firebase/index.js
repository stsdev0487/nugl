import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const prodConfig = {
  apiKey: 'AIzaSyAnXdObyhK8OEZA9UVAik9bUGv-vmwL0fA',
  authDomain: 'nugl-da5c2.firebaseapp.com',
  databaseURL: 'https://nugl-da5c2.firebaseio.com',
  projectId: 'nugl-da5c2',
  storageBucket: 'nugl-da5c2.appspot.com',
  messagingSenderId: '923391876732',
}

const devConfig = {
  apiKey: 'AIzaSyC0G4bGCEqTYFSGjAqXY6zHnDsvY2-Zw2I',
  authDomain: 'nugl-dev.firebaseapp.com',
  databaseURL: 'https://nugl-dev.firebaseio.com',
  projectId: 'nugl-dev',
  storageBucket: 'nugl-dev.appspot.com',
  messagingSenderId: '665233179786',
}

const config =
  process.env.REACT_APP_ENV === 'production' ? prodConfig : devConfig

const fire = firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()

export const auth = firebase.auth()

export const firestore = firebase.firestore()

export const storage = firebase.storage()

export const Timestamp = firebase.firestore.Timestamp

export const types = {
  GeoPoint: firebase.firestore.GeoPoint,
}

export const fieldValues = {
  serverTimestamp: firebase.firestore.FieldValue.serverTimestamp,
  delete: firebase.firestore.FieldValue.delete,
}

export default fire
