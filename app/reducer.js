import { combineReducers } from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'

import routerReducer from './router/routerReducer'
import authReducer from './auth/authReducer'
import errorReducer from './error/errorReducer'
import barsReducer from './bars/barsReducer'
import searchReducer from './search/searchReducer'
import attendingReducer from './attending/attendingReducer'

const history = createBrowserHistory()

const initialState = {
  router: {
    location: history.location,
    action: history.action,
  },
  auth: {},
  error: '',
  bars: [],
  search: {
    lastSearch: '',
    fetching: false,
  },
  attending: {},
}

const reducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  error: errorReducer,
  bars: barsReducer,
  search: searchReducer,
  attending: attendingReducer,
})

export default reducer
export { history, initialState }
