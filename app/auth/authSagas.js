/* eslint-disable no-constant-condition */

import { takeLatest, takeEvery } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'

import api from '../api'


function* userObjectRequest() {
  const { response, error } = yield call(api.userObjectFetch)
  if (response === 'empty') {
    yield put({ type: 'USER_OBJECT_EMPTY' })
  } else if (response) {
    yield put({ type: 'USER_OBJECT_SUCCESS', user: response })
    if (response.lastSearch.length > 0) {
      yield put({ type: 'BARS_SEARCH_REQUEST', search: response.lastSearch })
    }
  } else {
    yield put({ type: 'USER_OBJECT_ERROR', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Error getting user object.' })
  }
}

function* logoutRequest() {
  const { success, error } = yield call(api.logoutFetch)
  if (success) {
    yield put({ type: 'LOGOUT_SUCCESS' })
  } else {
    yield put({ type: 'LOGOUT_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Logout failed.' })
  }
}

function* loginRequest(action) {
  const { response, error } = yield call(api.loginFetch, action.username, action.password)
  if (response) {
    yield put({ type: 'LOGIN_SUCCESS', user: response })
    let nextSearch = ''
    if (response.lastSearch.length > 0) {
      nextSearch = response.lastSearch
    } else {
      nextSearch = yield select(state => state.search.lastSearch)
    }
    if (nextSearch.length > 0) {
      yield put({ type: 'BARS_SEARCH_REQUEST', search: nextSearch })
    }
  } else {
    yield put({ type: 'LOGIN_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Login failed. Username or password may be incorrect.' })
  }
}

function* signupRequest(action) {
  const { success, error } = yield call(api.signupFetch, action.username, action.password)
  if (success) {
    yield put({ type: 'SIGNUP_SUCCESS' })
  } else {
    yield put({ type: 'SIGNUP_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Signup failed. Username may be taken.' })
  }
}


export default function* authSagas() {
  yield takeEvery('USER_OBJECT_REQUEST', userObjectRequest)
  yield takeEvery('LOGOUT_REQUEST', logoutRequest)
  yield takeLatest('LOGIN_REQUEST', loginRequest)
  yield takeLatest('SIGNUP_REQUEST', signupRequest)
}
