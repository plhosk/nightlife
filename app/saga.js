import { signupSaga, loginSaga, logoutSaga, getUserObjectSaga } from './auth/authSagas'

export default function* rootSaga() {
  yield [
    signupSaga(),
    loginSaga(),
    logoutSaga(),
    getUserObjectSaga(),
  ]
}
