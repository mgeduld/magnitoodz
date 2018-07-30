import { all } from 'redux-saga/effects'
import { saga as magnitoodzSaga } from '../modules/magnitoodz/saga'

export function* sagas() {
    yield all([
        magnitoodzSaga()
    ])
}