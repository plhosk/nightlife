import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import api from '../api'

function* attendingCountRequest(action) {
  const { response, error } = yield call(api.attendingCountFetch, action.yelpId)
  if (response) {
    yield put({ type: 'ATTENDING_COUNT_SUCCESS', yelpId: response.yelpId, count: response.count })
  } else {
    yield put({ type: 'ATTENDING_COUNT_ERROR', error })
  }
}

function* attendingAddRequest(action) {
  const { response, error } = yield call(api.attendingAddFetch, action.yelpId)
  if (response) {
    yield put({ type: 'ATTENDING_ADD_SUCCESS', yelpId: action.yelpId })
    yield put({ type: 'ATTENDING_COUNT_REQUEST', yelpId: action.yelpId })
  } else {
    yield put({ type: 'ATTENDING_ADD_ERROR', error })
  }
}

export default function* barsSagas() {
  yield takeEvery('ATTENDING_COUNT_REQUEST', attendingCountRequest)
  yield takeLatest('ATTENDING_ADD_REQUEST', attendingAddRequest)
}
