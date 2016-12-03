import 'isomorphic-fetch'

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Router from 'react-router-addons-controlled/ControlledBrowserRouter'
import createBrowserHistory from 'history/createBrowserHistory'

import routerReducer from './router'
import errorReducer from './error'
import authReducer from './auth/auth'

import rootSaga from './sagas'

import AppContent from './AppContent'

const history = createBrowserHistory()
export default history


injectTapEventPlugin()

const initialState = {
  router: {
    location: history.location,
    action: history.action,
  },
  auth: {},
  error: '',
}

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  error: errorReducer,
})

const sagaMiddleware = createSagaMiddleware()
let storeEnhancers = applyMiddleware(sagaMiddleware)

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  storeEnhancers = compose(storeEnhancers, window.devToolsExtension())
}

const store = createStore(rootReducer, initialState, storeEnhancers)

sagaMiddleware.run(rootSaga)

let App = props => (
  <Router
    history={history}
    location={props.location}
    action={props.action}
    onChange={(location, action) => {
      // you must always dispatch a `SYNC` action,
      // because, guess what? you can't actual control the browser history!
      // anyway, use your current action not "SYNC"
      if (action === 'SYNC') {
        props.dispatch({ type: 'NAVIGATE', location, action: props.action })
      } else if (!window.block) {
        // if you want to block transitions go into the console and type in
        // `window.block = true` and transitions won't happen anymore
        props.dispatch({ type: 'NAVIGATE', location, action })
      } else {
        console.log('blocked!') // eslint-disable-line
      }
    }}
  >
    <MuiThemeProvider>
      <AppContent />
    </MuiThemeProvider>
  </Router>
)

App.propTypes = {
  location: PropTypes.object.isRequired, //eslint-disable-line
  action: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  location: state.router.location,
  action: state.router.action,
})

App = connect(mapStateToProps)(App)

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app'),
)
