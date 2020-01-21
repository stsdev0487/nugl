import { combineReducers } from 'redux'
import messageReducer from './messageReducer'
import loadingReducer from './loadingReducer'
import userReducer from './userReducer'
import mapReducer from './mapReducer'
import profileReducer from './profileReducer'
import currentLocationReducer from './currentLocationReducer'
import searchText from './searchText'

const rootReducer = combineReducers({
  loading: loadingReducer,
  messages: messageReducer,
  user: userReducer,
  map: mapReducer,
  profile: profileReducer,
  currentLocation: currentLocationReducer,
  searchText,
})

export default rootReducer
