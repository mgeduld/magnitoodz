import { all } from 'redux-saga/effects'
import { saga as magnitoodzSaga } from '../modules/magnitoodz'
import { saga as authenticationSaga } from '../modules/authentication'

export function* sagas() {
    yield all([
        authenticationSaga(),
        magnitoodzSaga()
    ])
}