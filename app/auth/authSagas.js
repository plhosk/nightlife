/* eslint-disable no-constant-condition */

import { takeLatest } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'

import api from '../api'


export function* getUserObjectSaga() {
  while (true) {
    yield take('USER_OBJECT_REQUEST')
    const { response, error } = yield call(api.userObjectFetch)
    if (response === 'empty') {
      yield put({ type: 'USER_OBJECT_EMPTY' })
    } else if (response) {
      yield put({ type: 'USER_OBJECT_SUCCESS', user: response })
    } else {
      yield put({ type: 'USER_OBJECT_ERROR', error })
      yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Error getting user object.' })
    }
  }
}


export function* logoutSaga() {
  while (true) {
    yield take('LOGOUT_REQUEST')
    const { success, error } = yield call(api.logoutFetch)
    if (success) {
      yield put({ type: 'LOGOUT_SUCCESS' })
    } else {
      yield put({ type: 'LOGOUT_FAILED', error })
      yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Logout failed.' })
    }
  }
}


function* login(action) {
  const { response, error } = yield call(api.loginFetch, action.username, action.password)
  if (response) {
    yield put({ type: 'LOGIN_SUCCESS', user: response })
  } else {
    yield put({ type: 'LOGIN_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Login failed. Username or password may be incorrect.' })
  }
}

export function* loginSaga() {
  yield takeLatest('LOGIN_REQUEST', login)
}


function* signup(action) {
  const { success, error } = yield call(api.signupFetch, action.username, action.password)
  if (success) {
    yield put({ type: 'SIGNUP_SUCCESS' })
  } else {
    yield put({ type: 'SIGNUP_FAILED', error })
    yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Signup failed. Username may be taken.' })
  }
}

export function* signupSaga() {
  yield takeLatest('SIGNUP_REQUEST', signup)
}
