import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import api from '../api'

function* barsSearchRequest(action) {
  const { response, error } = yield call(api.barsFetch, action.search)
  if (response === 'empty') {
    yield put({ type: 'BARS_SEARCH_EMPTY' })
  } else if (response) {
    for (let i = 0; i < response.length; i += 1) {
      yield put({ type: 'ATTENDING_COUNT_REQUEST', yelpId: response[i].id })
    }
    yield put({ type: 'BARS_SEARCH_SUCCESS', bars: response })
  } else {
    yield put({ type: 'BARS_SEARCH_ERROR', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Error fetching bars.' })
  }
}


export default function* barsSagas() {
  yield takeLatest('BARS_SEARCH_REQUEST', barsSearchRequest)
}
