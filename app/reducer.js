import { combineReducers } from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'

import routerReducer from './router/routerReducer'
import errorReducer from './error/errorReducer'
import authReducer from './auth/authReducer'

const history = createBrowserHistory()

const initialState = {
  router: {
    location: history.location,
    action: history.action,
  },
  auth: {},
  error: '',
}

const reducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  error: errorReducer,
})

export default reducer
export { history, initialState }
