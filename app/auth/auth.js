/* eslint-disable no-constant-condition */

import { takeLatest } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'USER_OBJECT_SUCCESS':
      return {
        user: action.user,
      }

    case 'LOGOUT_SUCCESS':
      return {}

    default:
      return state
  }
}

const apiUserObjectFetch = () => (
    fetch('/api/login', {
      credentials: 'same-origin',
      method: 'GET',
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
        .then(json => ({ response: json }))
      }
      if (response.status === 204) {
        return { response: 'empty' }
      }
      return { error: response }
    })
    .catch(error => ({ error }))
)

export function* getUserObjectSaga() {
  while (true) {
    yield take('USER_OBJECT_REQUEST')
    const { response, error } = yield call(apiUserObjectFetch)
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

const apiLogoutFetch = () => (
  fetch('/api/logout', {
    credentials: 'same-origin',
    method: 'DELETE',
  })
  .then((response) => {
    if (response.status === 200) {
      return { success: true }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

export function* logoutSaga() {
  while (true) {
    yield take('LOGOUT_REQUEST')
    const { success, error } = yield call(apiLogoutFetch)
    if (success) {
      yield put({ type: 'LOGOUT_SUCCESS' })
    } else {
      yield put({ type: 'LOGOUT_FAILED', error })
      yield put({ type: 'SHOW_ERROR_MESSAGE', error: 'Logout failed.' })
    }
  }
}

const apiLoginFetch = (username, password) => (
  fetch('/api/login', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json()
      .then(json => ({ response: json }))
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

function* login(action) {
  const { response, error } = yield call(apiLoginFetch, action.username, action.password)
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

const apiSignupFetch = (username, password) => (
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return { success: true }
    }
    return { error: response }
  })
  .catch(error => ({ error }))
)

function* signup(action) {
  const { success, error } = yield call(apiSignupFetch, action.username, action.password)
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
