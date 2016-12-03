import { signupSaga, loginSaga, logoutSaga, getUserObjectSaga } from './auth/auth'

export default function* rootSaga() {
  yield [
    signupSaga(),
    loginSaga(),
    logoutSaga(),
    getUserObjectSaga(),
  ]
}
