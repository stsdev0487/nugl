import React from 'react'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import { unregister } from './registerServiceWorker'
import App from './components/App'
import { auth } from './firebase'
import { receiveUserOnAuthStateChanged } from './store/actions/userActions'
import './index.css'

const store = configureStore({})

auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(receiveUserOnAuthStateChanged(user))
  }
})

render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root'),
)

unregister()
// registerServiceWorker();
