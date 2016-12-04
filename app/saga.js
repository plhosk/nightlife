import { take } from 'redux-saga/effects'

import authSagas from './auth/authSagas'


// Log every Redux action
function* logActions() {
  while (true) { //eslint-disable-line
    const action = yield take()
    console.log(JSON.stringify(action)) //eslint-disable-line
  }
}

export default function* rootSaga() {
  yield [
    logActions(),
    authSagas(),
  ]
}
