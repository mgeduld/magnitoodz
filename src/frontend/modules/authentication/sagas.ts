import { call, put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../../enums/action-type'
import { IAction } from '../../interfaces/action'
import { ICredentials } from '../../../shared/interfaces/authentication'
import { AuthenticationState } from '../../enums/authentication'

const origin: string = process.env.SERVER_ORIGIN

const signupViaEndpoint = (credentials: ICredentials) =>
  fetch(`${origin}/api/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then((res) => res.json())
    .catch((error) => console.log('Error signing up', error))

const logInViaEndpoint = (credentials: ICredentials) =>
  fetch(`${origin}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then((res) => res.json())
    .catch((error) => console.log('Error logging in', error))

const logOutViaEndpoint = () => {
  fetch(`${origin}/api/v1/logout`, {
    credentials: 'include'
  })
    .then((res) => res.json())
    .catch((error) => console.log('Error logging out', error))
}

function* requestSignup(action: IAction) {
  const response = yield call(signupViaEndpoint, action.credentials)
  if (response.ok) {
    yield put({
      type: ActionType.changeAuthenticationState,
      state: AuthenticationState.loggedIn,
      id: response.id
    })
  } else {
    yield put({
      type: ActionType.changeAuthenticationState,
      state: AuthenticationState.signUpFailed
    })
  }
}

function* requestLogOut() {
  yield call(logOutViaEndpoint)
  yield put({
    type: ActionType.changeAuthenticationState,
    state: AuthenticationState.loggedOut
  })
}

function* requestLogIn(action: IAction) {
  const response = yield call(logInViaEndpoint, action.credentials)
  if (response.ok) {
    yield put({
      type: ActionType.changeAuthenticationState,
      state: AuthenticationState.loggedIn,
      id: response.id
    })
  } else {
    yield put({
      type: ActionType.changeAuthenticationState,
      state: AuthenticationState.logInFailed
    })
  }
}

export function* saga() {
  yield takeEvery(ActionType.requestSignup, requestSignup)
  yield takeEvery(ActionType.requestLogOut, requestLogOut)
  yield takeEvery(ActionType.requestLogIn, requestLogIn)
}
